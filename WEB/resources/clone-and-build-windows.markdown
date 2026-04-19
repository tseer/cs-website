---
layout: page
title: "Clone and Build Guide (Windows)"
permalink: /resources/clone-and-build/windows/
hide_page_header: true
---
<div class="setup-guide">
  {% include setup-guide-tabs.html active="windows" %}

  <div class="setup-guide-card">
    <h1>CS Website Setup Instructions (Windows)</h1>

    <p>
      These instructions explain how to run the Jekyll website locally on Windows
      using <strong>Windows Subsystem for Linux (WSL)</strong>, which is the recommended
      method for Ruby and Jekyll development.
    </p>

    <h2>1. Install Windows Subsystem for Linux</h2>

    <p>Open PowerShell as Administrator and run:</p>

    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>wsl --install</code></pre>
    </div>

    <p>Restart your computer after installation.</p>

    <p>This installs:</p>

    <ul>
      <li>WSL</li>
      <li>Ubuntu Linux</li>
    </ul>

    <hr class="setup-guide-divider" />

    <h2>2. Open Ubuntu (WSL)</h2>

    <p>Search for <strong>Ubuntu</strong> in the Windows Start Menu and open it.</p>
    <p>You will see a Linux terminal.</p>

    <hr class="setup-guide-divider" />

    <h2>3. Install Ruby and Jekyll Dependencies</h2>

    <p>Run the following commands in Ubuntu:</p>

    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>sudo apt update
sudo apt install ruby-full build-essential zlib1g-dev</code></pre>
    </div>

    <p>Install Bundler:</p>

    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>gem install bundler</code></pre>
    </div>

    <hr class="setup-guide-divider" />

    <h2>4. Clone the Repository</h2>

    <p>Clone the team repo:</p>

    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>git clone https://github.com/tseer/cs-website.git
cd cs-website</code></pre>
    </div>

    <hr class="setup-guide-divider" />

    <h2>5. Install Project Dependencies</h2>

    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>bundle install</code></pre>
    </div>

    <hr class="setup-guide-divider" />

    <h2>6. Run the Website Locally</h2>

    <p>Create a local config file:</p>

    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>nano _config_local.yml</code></pre>
    </div>

    <p>Paste:</p>

    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>url: ""
baseurl: ""</code></pre>
    </div>

    <p>Start the server:</p>

    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>bundle exec jekyll serve --config _config.yml,_config_local.yml</code></pre>
    </div>

    <p>Open your browser and go to:</p>

    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>http://localhost:4000</code></pre>
    </div>

    <hr class="setup-guide-divider" />

    <h2>7. Build the Site</h2>

    <p>To generate the static website:</p>

    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>bundle exec jekyll build --config _config.yml,_config_local.yml</code></pre>
    </div>

    <p>The generated site will appear in:</p>

    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>_site/</code></pre>
    </div>

    <hr class="setup-guide-divider" />

    <h2>8. Team Workflow</h2>

    <p>Create a branch before making changes:</p>

    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>git checkout main
git pull
git checkout -b your-feature-branch</code></pre>
    </div>

    <p>Commit and push changes:</p>

    <div class="setup-guide-code-block">
      <button class="setup-guide-copy-btn js-copy-code" type="button">Copy</button>
      <pre><code>git add .
git commit -m "describe your change"
git push origin your-feature-branch</code></pre>
    </div>

    <p>Create a Pull Request on GitHub.</p>

    <hr class="setup-guide-divider" />

    <div class="setup-guide-important">
      <strong>Important:</strong> Never edit the <code>_site</code> directory.
      Only edit the source files.
    </div>
  </div>
</div>

<script src="{{ '/WEB/javascript/clone-and-build.js' | relative_url }}"></script>
