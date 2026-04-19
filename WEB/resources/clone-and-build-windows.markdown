---
layout: null
permalink: /resources/clone-and-build/windows/
---
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CS Website Setup Instructions (Windows)</title>

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
body{
    font-family: Arial, Helvetica, sans-serif;
    background:#f5f7fb;
    margin:0;
}

.container{
    max-width:900px;
    margin:40px auto;
    background:white;
    padding:30px;
    border-radius:10px;
    box-shadow:0 5px 20px rgba(0,0,0,0.05);
}

h1{
    color:#0b3a75;
    border-bottom:3px solid #0b3a75;
    padding-bottom:10px;
}

h2{
    color:#0b3a75;
    margin-top:35px;
    border-bottom:1px solid #ddd;
    padding-bottom:6px;
}

pre{
    background:#111827;
    color:white;
    padding:15px;
    border-radius:8px;
    overflow-x:auto;
}

code{
    font-family:monospace;
}

.code-block{
    position:relative;
    margin:15px 0;
}

.copy-btn{
    position:absolute;
    top:8px;
    right:8px;
    background:#2563eb;
    color:white;
    border:none;
    padding:6px 10px;
    border-radius:6px;
    cursor:pointer;
}

.copy-btn:hover{
    background:#1d4ed8;
}

.note{
    background:#fff8dc;
    border-left:5px solid #eab308;
    padding:10px;
    margin:15px 0;
}

.important{
    background:#fde8e8;
    border-left:5px solid #dc2626;
    padding:10px;
    margin:15px 0;
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
      <a href="{{ '/resources/clone-and-build/' | relative_url }}" class="nav-link">Mac Setup</a>
      <a href="{{ '/resources/clone-and-build/windows/' | relative_url }}" class="nav-link active">Windows Setup</a>
    </div>

  </div>
</nav>
<div class="container">

<h1>CS Website Setup Instructions (Windows)</h1>

<p>
These instructions explain how to run the Jekyll website locally on Windows
using <strong>Windows Subsystem for Linux (WSL)</strong>, which is the recommended
method for Ruby and Jekyll development.
</p>

<h2>1. Install Windows Subsystem for Linux</h2>

<p>Open PowerShell as Administrator and run:</p>

<div class="code-block">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>wsl --install</code></pre>
</div>

<p>Restart your computer after installation.</p>

<p>This installs:</p>

<ul>
<li>WSL</li>
<li>Ubuntu Linux</li>
</ul>

---

<h2>2. Open Ubuntu (WSL)</h2>

Search for <strong>Ubuntu</strong> in the Windows Start Menu and open it.

You will see a Linux terminal.

---

<h2>3. Install Ruby and Jekyll Dependencies</h2>

Run the following commands in Ubuntu:

<div class="code-block">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>sudo apt update
sudo apt install ruby-full build-essential zlib1g-dev</code></pre>
</div>

Install Bundler:

<div class="code-block">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>gem install bundler</code></pre>
</div>

---

<h2>4. Clone the Repository</h2>

Clone the team repo:

<div class="code-block">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>git clone https://github.com/tseer/cs-website.git
cd cs-website</code></pre>
</div>

---

<h2>5. Install Project Dependencies</h2>

<div class="code-block">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>bundle install</code></pre>
</div>

---

<h2>6. Run the Website Locally</h2>

Create a local config file:

<div class="code-block">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>nano _config_local.yml</code></pre>
</div>

Paste:

<div class="code-block">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>url: ""
baseurl: ""</code></pre>
</div>

Start the server:

<div class="code-block">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>bundle exec jekyll serve --config _config.yml,_config_local.yml</code></pre>
</div>

Open your browser and go to:

<div class="code-block">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>http://localhost:4000</code></pre>
</div>

---

<h2>7. Build the Site</h2>

To generate the static website:

<div class="code-block">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>bundle exec jekyll build --config _config.yml,_config_local.yml</code></pre>
</div>

The generated site will appear in:

<div class="code-block">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>_site/</code></pre>
</div>

---

<h2>8. Team Workflow</h2>

Create a branch before making changes:

<div class="code-block">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>git checkout main
git pull
git checkout -b your-feature-branch</code></pre>
</div>

Commit and push changes:

<div class="code-block">
<button class="copy-btn" onclick="copyCode(this)">Copy</button>
<pre><code>git add .
git commit -m "describe your change"
git push origin your-feature-branch</code></pre>
</div>

Create a Pull Request on GitHub.

---

<div class="important">
<strong>Important:</strong> Never edit the <code>_site</code> directory.
Only edit the source files.
</div>

</div>

<script>
function copyCode(button){
    const code = button.parentElement.querySelector("code").innerText;
    navigator.clipboard.writeText(code);
    button.innerText="Copied!";
    setTimeout(()=>button.innerText="Copy",1500);
}
</script>

</body>
</html>
