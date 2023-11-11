# No-IP domain renewal automation


# Goal
No-IP free domains expire every month, to keep them you should activate via webpage. The goal is to fully automate this task.

Alternative: change to free dynamic [DNS provider](https://www.nsupdate.info/)

# Solution

Playwright script automates the process of activating the domain via browser. Executed as a GH actions workflow, scheduled once in every month.

# Local Setup

To run locally you should 
```
# install package.json 
npm i 

# install Chromium for playwright
npx playwright install --with-deps chromium

# run activation 
npx playwright test
```

# Containerization

You can build a Docker container from the code and start with

```
docker build -t activate .

docker run --rm -e USERNAME=<USER> -e PASSWORD=<PASS> activate 
```