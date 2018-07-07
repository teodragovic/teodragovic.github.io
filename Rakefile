require "rubygems"
require "bundler/setup"
require "stringex"

## -- Configs -- ##

deploy_branch   = "master"
deploy_dir      = "deploy"   # deploy directory (for Github pages deployment)
public_dir      = "build"    # build directory


desc "Generate website and deploy"
task :deploy => [:build, :push] do
end

desc "Generate site"
task :build do
    system "npm run build"
end

desc "Deploy public directory to github pages"
multitask :push do
    FileUtils.rm_rf(Dir.glob("#{deploy_dir}/*"))
    cp_r "#{public_dir}/.", deploy_dir
    cd "#{deploy_dir}" do
        system "git add ."
        system "git add -u"
        message = "Site updated at #{Time.now.utc}"
        system "git commit -m \"#{message}\""
        system "git push origin #{deploy_branch} --force"
        puts "\n## Github Pages deploy complete"
    end
end
