# Linux (ubuntu)
## 1° Update ubuntu
<pre>
  sudo apt update && sudo apt upgrade
</pre>

## 2° Install Node.js
<pre>
  curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

  sudo apt-get install -y nodejs
</pre>

## 3° Install dependencies
<pre>
  cd eventCards-BOT

  npm install --production --force
</pre>

## 4° Setting the bot

- <code>cd src/config</code>

- <code>mv main.example.js main.js</code>

- <code>vim main.js</code>

- Press the key <code>i</code>

- Fill in all empty fields

- Press the key <code>ESC</code>

- Type in keyboard <code>:wq</code>

- Press <code>Enter</code>

## 5° Starting
<pre>
  cd eventCards-BOT

  nohup npm start > log.txt 2> err.txt &
</pre>

## 6° Logs monitoring
<pre>
  tail -f log.txt

  tail -f err.txt
</pre>
</br>

# Windows 10
## 1° Install Node.js
<pre>
  <a href=https://nodejs.org/dist/v14.15.4/node-v14.15.4-x64.msi>https://nodejs.org/dist/v14.15.4/node-v14.15.4-x64.msi</a>
</pre>

## 2° Install dependencies
  - Unzip
  - run <code>install.bat</code> file

## 3° Setting the bot
  - Navigate to <code>src/config</code>
  - Rename the <code>main.example.js</code> file to <code>main.js</code>
  - Open the <code>main.js</code> file
  - Fill in all empty fields
  
## 4° Starting
  - run <code>start.bat</code> file
