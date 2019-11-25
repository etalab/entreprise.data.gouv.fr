require 'mina/bundler'
require 'mina/rails'
require 'colorize'

ENV['domain'] || raise('no domain provided'.red)

ENV['to'] ||= 'sandbox'
unless %w[sandbox production].include?(ENV['to'])
  raise("target environment (#{ENV['to']}) not in the list")
end

set :user, 'deploy'
set :application_name, 'entreprise.data.gouv.fr'

set :deploy_to, "/var/www/entreprise.data.gouv.fr_#{ENV['to']}"

# repository is useless, because we don't clone. But required for mina/rails in charge of repository setup.
set :repository, 'git@github.com:etalab/entreprise.data.gouv.fr.git'

set :forward_agent, true
set :port, 22

if ENV['to'] == 'production'
  set :branch, 'master'
elsif ENV['to'] == 'sandbox'
  set :branch, 'develop'
end

desc 'Deploys the current version to the server.'
task :deploy do
  run :local do
    in_path(Dir.pwd) do
      invoke :warning_right_branch
      invoke :local_build
      invoke :deploy_website
    end
  end
end

task :local_build do
  comment "Building for #{ENV['to']}...".green
  if ENV['to'] == 'production'
    command 'npm run build:production'
  else
    command 'npm run build:sandbox'
  end
end

task :deploy_website do
  comment "Copying files to remote directory: #{fetch(:deploy_to)}".green
  command "scp -r dist/* #{fetch(:user)}@#{fetch(:domain)}:#{fetch(:deploy_to)}"
end

task :warning_right_branch do
  git_active_branch_command = 'git rev-parse --abbrev-ref HEAD'
  git_active_branch = `#{git_active_branch_command}`
  git_active_branch.slice!("\n")

  red = '\033[0;31m'
  no_color = '\033[0m'
  comment "Ensuring you're on the branch you're deploying to".yellow
  command "if (#{git_active_branch_command} | grep #{fetch(:branch)}) > /dev/null
    then
      echo 'You are on the right branch, continuing...'
    else
      echo '#{red}You a trying to deploy #{fetch(:branch)} while on #{git_active_branch} !#{no_color}'
      sleep 5
    fi"
end
