# add bash customizations here

#eg
ylw='\033[1;33m'   # Yellow
red='\033[1;31m'   # Red
cyn='\033[0;36m'   # Cyan
wht='\033[1;37m'   # White
clr='\033[0m'      # Reset

alias gkg='echo go kings go'

function pakkupakku() {
  echo -e "${ylw}ᗧ${wht} ··· ${red}ᗣ${wht} ··· ${cyn}ᗣ${wht} ··· ${clr}"
}

PATH=~/.console-ninja/.bin:$PATH