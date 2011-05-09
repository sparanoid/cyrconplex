desc 'Build and deploy'
task :default do
	# Settings
	ssh_user = 'root@sparanoid.com'
	remote_root = '/srv/www/sparanoid.com/public_html/'

	# Deploy
	puts 'Deploying...'
	system("jekyll --no-server --no-auto && rsync -avz --delete --exclude=*.ai --exclude=*.psd --exclude=assets/css/a.css --exclude=assets/css/feed.css --exclude=lab _site/ #{ssh_user}:#{remote_root}")
	puts 'Deployed.'
end