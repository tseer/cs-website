---
layout: page
title: "Clone and Build Guide"
permalink: /resources/clone-and-build/
hide_page_header: true
summary: "Step-by-step setup instructions for the CS410 website project, including cloning the repository, running the site locally, building for deployment, and uploading to the UMass Boston CS server."
description: "Step-by-step setup instructions for the CS410 website project, including cloning the repository, running the site locally, building for deployment, and uploading to the UMass Boston CS server."
og_type: article
twitter_card: summary
---
<div class="setup-guide">
  {% include setup-guide-tabs.html active="mac" %}

  <div class="setup-guide-card">
    <h1>CS Website Team Setup Instructions</h1>
    <p>
      These instructions explain how to clone the shared Jekyll repository, run it locally,
      build it for deployment, and upload it to the UMass Boston CS server.
    </p>

    <h2>1. Clone the Repository</h2>
    <p>Open Terminal and go to the folder where you want to store the project:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>cd ~/Desktop
git clone https://github.com/tseer/cs-website.git
cd cs-website</code></pre>
    </div>

    <p>Check that you are in the correct directory:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>ls</code></pre>
    </div>

    <p>You should see files and folders like:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>_config.yml
Gemfile
_layouts
_includes
_data
_sass
WEB</code></pre>
    </div>

    <h2>2. Install Ruby, Bundler, and Jekyll</h2>
    <p>
      If your system Ruby is too old, use <code>rbenv</code> to install a newer version.
      This is especially important on macOS.
    </p>

    <h3>macOS setup with Homebrew and rbenv</h3>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>brew update
brew install rbenv ruby-build
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc
rbenv install 3.2.4
rbenv local 3.2.4
ruby -v
gem install bundler</code></pre>
    </div>

    <div class="setup-guide-note">
      <strong>Note:</strong> The Ruby version should be 3.x. Older versions may fail when running <code>bundle install</code>.
    </div>

    <h2>3. Install Project Dependencies</h2>
    <p>From inside the repo directory, run:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>bundle install</code></pre>
    </div>

    <p>This reads the <code>Gemfile</code> and installs the required gems for the Jekyll site.</p>

    <h2>4. Run the Site Locally with Jekyll</h2>
    <p>Create a local override config file:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>nano _config_local.yml</code></pre>
    </div>

    <p>Paste this into the file:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>url: ""
baseurl: ""</code></pre>
    </div>

    <p>Save the file, then start the local server:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>bundle exec jekyll serve --config _config.yml,_config_local.yml</code></pre>
    </div>

    <p>Open this in your browser:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>http://localhost:4000</code></pre>
    </div>

    <h2>5. Build the Static Site</h2>
    <p>When you want to generate the full deployable output, run:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>bundle exec jekyll clean
bundle exec jekyll build --config _config.yml,_config_local.yml</code></pre>
    </div>

    <p>The generated static site will appear in:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>_site/</code></pre>
    </div>

    <h2>6. Team Workflow for Editing</h2>
    <p>Each team member should work in their own Git branch.</p>

    <h3>Update main and create a branch</h3>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>git checkout main
git pull origin main
git checkout -b your-feature-name</code></pre>
    </div>

    <p>Example:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>git checkout -b fix-navigation-links</code></pre>
    </div>

    <h3>Preview changes locally</h3>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>bundle exec jekyll serve --config _config.yml,_config_local.yml</code></pre>
    </div>

    <h3>Commit and push changes</h3>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>git add .
git commit -m "Fix navigation links"
git push origin your-feature-name</code></pre>
    </div>

    <p>Then create a pull request on GitHub.</p>

    <div class="setup-guide-important">
      <strong>Important:</strong> Never edit <code>_site/</code> directly. Only edit the Jekyll source files.
    </div>

    <h2>7. Build for the CS Server</h2>
    <p>
      To deploy the site at:
      <br>
      <code>https://www.cs.umb.edu/~hdeblois/cs410/longproj01/t5-CS/site/</code>
    </p>

    <p>Create a CS server config file:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>nano _config_csserver.yml</code></pre>
    </div>

    <p>Paste this into the file:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>url: ""
baseurl: "/~hdeblois/cs410/longproj01/t5-CS/site"</code></pre>
    </div>

    <p>Then build the site for the CS server:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>bundle exec jekyll clean
bundle exec jekyll build --config _config.yml,_config_csserver.yml</code></pre>
    </div>

    <h2>8. Upload to the CS Server</h2>
    <p>Use <code>rsync</code> from your laptop to upload the built site:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>rsync -av --delete _site/ hdeblois@pe15.cs.umb.edu:/home/hdeblois/public_html/cs410/longproj01/t5-CS/site/</code></pre>
    </div>

    <p>Then open:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>https://www.cs.umb.edu/~hdeblois/cs410/longproj01/t5-CS/site/</code></pre>
    </div>

    <h2>9. Quick Deployment Workflow</h2>

    <h3>Run locally</h3>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>bundle exec jekyll serve --config _config.yml,_config_local.yml</code></pre>
    </div>

    <h3>Build for server</h3>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>bundle exec jekyll build --config _config.yml,_config_csserver.yml</code></pre>
    </div>

    <h3>Upload</h3>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>rsync -av --delete _site/ hdeblois@pe15.cs.umb.edu:/home/hdeblois/public_html/cs410/longproj01/t5-CS/site/</code></pre>
    </div>

    <h2>10. Troubleshooting</h2>

    <h3>“Could not locate Gemfile”</h3>
    <p>You are not inside the project directory.</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>cd cs-website</code></pre>
    </div>

    <h3>Ruby version too old</h3>
    <p>Install Ruby 3.2.4 using <code>rbenv</code>.</p>

    <h3>Links point to the real CS site</h3>
    <p>Build with the correct config file:</p>
    <ul>
      <li><code>_config_local.yml</code> for local testing</li>
      <li><code>_config_csserver.yml</code> for deployment</li>
    </ul>

    <h3>Site looks broken on the CS server</h3>
    <p>This usually means the <code>baseurl</code> was wrong during the build. Rebuild and upload again:</p>
    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>bundle exec jekyll build --config _config.yml,_config_csserver.yml</code></pre>
    </div>

    <h2>11. Team Rules</h2>
    <ol>
      <li>Clone the repo and work locally</li>
      <li>Use Jekyll to preview changes</li>
      <li>Never edit <code>_site</code> directly</li>
      <li>Always branch from <code>main</code></li>
      <li>Commit small, focused changes</li>
      <li>Use pull requests before merging</li>
      <li>Only deploy from <code>main</code></li>
    </ol>

    <div class="setup-guide-footer"></div>
  </div>
</div>

<script src="{{ '/WEB/javascript/clone-and-build.js' | relative_url }}"></script>
