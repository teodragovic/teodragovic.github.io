---
title: Masking API latency in Preact
date: 2021-06-11
tags:
  - dev
  - js
layout: post
---

In [Hugo](https://www.withhugo.com) app, during signup flow, we have a button that triggers particularly long API call. For this step, we wanted to mask latency by giving users something more to look at aside from our regular loading state spinner. 

We decided to run API call in parallel with our onboarding flow. We were already displaying onboarding at a similar point in time so it came in handy, but showing any kind of useful-but-not-critical information or animations would do. 

Only after both API call and onboarding flow are complete, user can continue onto the next step. If the user ends onboarding before we get an API response, _then_ we throw a little spinner (but for much shorter time).

Here is a simplified version of the code:

```jsx
const OnboardingModal = ({ onContinue }) => {
    const [ loading, setLoading ] = useState(false);
    return (
        <Modal>
            <Onboarding />
            <Button
                loading={ loading }
                onClick={ () => {
                    setLoading(true);
                    onContinue();
                } }
            >
                OK, continue
            </Button>
        </Modal>
    );
};

const MaskedLatency = ({ onSubmit }) => {
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ apiDone, setApiDone ] = useState(false);
    const [ onboardingDone, setOnboardingDone ] = useState(false);

    const maskLatency = () => {
        setModalVisible(true);

        // 1. Hit API
        fetch('http://api.withhugo.com/expensive-request')
        .then(() => setApiDone(true))
        .error(() => setModalVisible(false));
    };

    useEffect(() => {
        // 2. Run actual callback after both API
        // and distraction is done.
        apiDone && onboardingDone && onSubmit();
    }, [ apiDone, onboardingDone, onSubmit ]);

    return (
        <Fragment>
            <Button onClick={ maskLatency }>
                Hit expensive API
            </Button>

            {
                modalVisible &&
                createPortal(
                    <OnboardingModal 
                        onContinue={ () => setOnboardingDone(true) } 
                    />,
                    document.body
                )
            }
        </Fragment>
    );
};
```

Note that in my case, `onSubmit` was responsible for unmounting `MaskedLatency` component so there was no need to call `setModalVisible(false)`.  
