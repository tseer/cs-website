---
layout: null
permalink: /resources/clone-and-build/
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CS Website Team Setup Instructions</title>
  <style>
.navbar{
    background:#0b3a75;
    padding:14px 0;
    box-shadow:0 2px 8px rgba(0,0,0,0.1);
}

.nav-container{
    max-width:1000px;
    margin:auto;
    display:flex;
    justify-content:space-between;
    align-items:center;
}

.nav-title{
    color:white;
    font-size:18px;
    font-weight:600;
}

.nav-links{
    display:flex;
    gap:20px;
}

.nav-link{
    color:white;
    text-decoration:none;
    padding:6px 10px;
    border-radius:6px;
    transition:background 0.2s;
}

.nav-link:hover{
    background:rgba(255,255,255,0.2);
}

.nav-link.active{
    background:white;
    color:#0b3a75;
}
    :root {
      --bg: #f5f7fb;
      --card: #ffffff;
      --text: #1f2937;
      --muted: #4b5563;
      --heading: #0b3a75;
      --border: #d6dbe4;
      --code-bg: #111827;
      --code-text: #f9fafb;
      --inline-bg: #eef2f7;
      --button: #2563eb;
      --button-hover: #1d4ed8;
      --note-bg: #fff8db;
      --note-border: #f1c40f;
      --important-bg: #fde8e8;
      --important-border: #dc2626;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.65;
      background: var(--bg);
      color: var(--text);
    }

    .container {
      max-width: 980px;
      margin: 40px auto;
      padding: 0 20px 40px;
    }

    .page {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 32px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
    }

    h1, h2, h3 {
      color: var(--heading);
      line-height: 1.25;
      margin-top: 0;
    }

    h1 {
      font-size: 2.2rem;
      margin-bottom: 12px;
      border-bottom: 3px solid var(--heading);
      padding-bottom: 10px;
    }

    h2 {
      font-size: 1.8rem;
      margin-top: 36px;
      margin-bottom: 14px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
    }

    h3 {
      font-size: 1.2rem;
      margin-top: 24px;
      margin-bottom: 10px;
    }

    p {
      margin: 12px 0;
      color: var(--text);
    }

    ul, ol {
      margin: 10px 0 10px 24px;
    }

    li {
      margin: 6px 0;
    }

    code {
      background: var(--inline-bg);
      color: #111827;
      padding: 2px 6px;
      border-radius: 5px;
      font-family: "Courier New", Courier, monospace;
      font-size: 0.95em;
    }

    .code-block {
      position: relative;
      margin: 14px 0 18px;
    }

    pre {
      margin: 0;
      background: var(--code-bg);
      color: var(--code-text);
      padding: 18px 18px 16px;
      border-radius: 12px;
      overflow-x: auto;
      border: 1px solid #0f172a;
    }

    pre code {
      background: transparent;
      color: var(--code-text);
      padding: 0;
      border-radius: 0;
      font-size: 0.97rem;
      line-height: 1.55;
      white-space: pre;
      display: block;
    }

    .copy-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      border: none;
      background: var(--button);
      color: #fff;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .copy-btn:hover {
      background: var(--button-hover);
    }

    .copy-btn.copied {
      background: #059669;
    }

    .note,
    .important {
      padding: 14px 16px;
      border-left: 5px solid;
      border-radius: 8px;
      margin: 18px 0;
    }

    .note {
      background: var(--note-bg);
      border-color: var(--note-border);
    }

    .important {
      background: var(--important-bg);
      border-color: var(--important-border);
    }

    .footer {
      margin-top: 40px;
      font-size: 0.95rem;
      color: var(--muted);
      border-top: 1px solid var(--border);
      padding-top: 16px;
    }

    @media (max-width: 700px) {
      .page {
        padding: 22px;
      }

      h1 {
        font-size: 1.8rem;
      }

      h2 {
        font-size: 1.45rem;
      }

      .copy-btn {
        position: static;
        display: inline-block;
        margin-bottom: 8px;
      }

      .code-block {
        margin-top: 10px;
      }
    }
  </style>
</head>
<body>
<nav class="navbar">
  <div class="nav-container">
    <div class="nav-title">
      CS410 Website Setup
    </div>

    <div class="nav-links">
      <a href="{{ '/resources/clone-and-build/' | relative_url }}" class="nav-link active">Mac Setup</a>
      <a href="{{ '/resources/clone-and-build/windows/' | relative_url }}" class="nav-link">Windows Setup</a>
    </div>

  </div>
</nav>
  <div class="container">
    <div class="page">
      <h1>CS Website Team Setup Instructions</h1>
      <p>
        These instructions explain how to clone the shared Jekyll repository, run it locally,
        build it for deployment, and upload it to the UMass Boston CS server.
      </p>

      <h2>1. Clone the Repository</h2>
      <p>Open Terminal and go to the folder where you want to store the project:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>cd ~/Desktop
git clone https://github.com/tseer/cs-website.git
cd cs-website</code></pre>
      </div>

      <p>Check that you are in the correct directory:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>ls</code></pre>
      </div>

      <p>You should see files and folders like:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
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
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>brew update
brew install rbenv ruby-build
echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
source ~/.zshrc
rbenv install 3.2.4
rbenv local 3.2.4
ruby -v
gem install bundler</code></pre>
      </div>

      <div class="note">
        <strong>Note:</strong> The Ruby version should be 3.x. Older versions may fail when running <code>bundle install</code>.
      </div>

      <h2>3. Install Project Dependencies</h2>
      <p>From inside the repo directory, run:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>bundle install</code></pre>
      </div>

      <p>This reads the <code>Gemfile</code> and installs the required gems for the Jekyll site.</p>

      <h2>4. Run the Site Locally with Jekyll</h2>
      <p>Create a local override config file:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>nano _config_local.yml</code></pre>
      </div>

      <p>Paste this into the file:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>url: ""
baseurl: ""</code></pre>
      </div>

      <p>Save the file, then start the local server:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>bundle exec jekyll serve --config _config.yml,_config_local.yml</code></pre>
      </div>

      <p>Open this in your browser:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>http://localhost:4000</code></pre>
      </div>

      <h2>5. Build the Static Site</h2>
      <p>When you want to generate the full deployable output, run:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>bundle exec jekyll clean
bundle exec jekyll build --config _config.yml,_config_local.yml</code></pre>
      </div>

      <p>The generated static site will appear in:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>_site/</code></pre>
      </div>

      <h2>6. Team Workflow for Editing</h2>
      <p>Each team member should work in their own Git branch.</p>

      <h3>Update main and create a branch</h3>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>git checkout main
git pull origin main
git checkout -b your-feature-name</code></pre>
      </div>

      <p>Example:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>git checkout -b fix-navigation-links</code></pre>
      </div>

      <h3>Preview changes locally</h3>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>bundle exec jekyll serve --config _config.yml,_config_local.yml</code></pre>
      </div>

      <h3>Commit and push changes</h3>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>git add .
git commit -m "Fix navigation links"
git push origin your-feature-name</code></pre>
      </div>

      <p>Then create a pull request on GitHub.</p>

      <div class="important">
        <strong>Important:</strong> Never edit <code>_site/</code> directly. Only edit the Jekyll source files.
      </div>

      <h2>7. Build for the CS Server</h2>
      <p>
        To deploy the site at:
        <br>
        <code>https://www.cs.umb.edu/~hdeblois/cs410/longproj01/t5-CS/site/</code>
      </p>

      <p>Create a CS server config file:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>nano _config_csserver.yml</code></pre>
      </div>

      <p>Paste this into the file:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>url: ""
baseurl: "/~hdeblois/cs410/longproj01/t5-CS/site"</code></pre>
      </div>

      <p>Then build the site for the CS server:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>bundle exec jekyll clean
bundle exec jekyll build --config _config.yml,_config_csserver.yml</code></pre>
      </div>

      <h2>8. Upload to the CS Server</h2>
      <p>Use <code>rsync</code> from your laptop to upload the built site:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>rsync -av --delete _site/ hdeblois@pe15.cs.umb.edu:/home/hdeblois/public_html/cs410/longproj01/t5-CS/site/</code></pre>
      </div>

      <p>Then open:</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>https://www.cs.umb.edu/~hdeblois/cs410/longproj01/t5-CS/site/</code></pre>
      </div>

      <h2>9. Quick Deployment Workflow</h2>

      <h3>Run locally</h3>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>bundle exec jekyll serve --config _config.yml,_config_local.yml</code></pre>
      </div>

      <h3>Build for server</h3>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>bundle exec jekyll build --config _config.yml,_config_csserver.yml</code></pre>
      </div>

      <h3>Upload</h3>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <pre><code>rsync -av --delete _site/ hdeblois@pe15.cs.umb.edu:/home/hdeblois/public_html/cs410/longproj01/t5-CS/site/</code></pre>
      </div>

      <h2>10. Troubleshooting</h2>

      <h3>“Could not locate Gemfile”</h3>
      <p>You are not inside the project directory.</p>
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
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
      <div class="code-block">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
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

      <div class="footer"></div>
    </div>
  </div>

  <script>
    function copyCode(button) {
      const code = button.parentElement.querySelector("pre code").innerText;
      navigator.clipboard.writeText(code).then(() => {
        const original = button.innerText;
        button.innerText = "Copied";
        button.classList.add("copied");
        setTimeout(() => {
          button.innerText = original;
          button.classList.remove("copied");
        }, 1500);
      }).catch(() => {
        button.innerText = "Failed";
        setTimeout(() => {
          button.innerText = "Copy";
        }, 1500);
      });
    }
  </script>
</body>
</html>
