# Thing Picker

<div id="your-pick"></div>

## Things

<div id="choices"></div>

<div id="buttons"></div>

<script>
(function () {
  let share;

  if (window.location.search.match(/^\?/)) {
    const params = window.location.search.substr(1).split('&');
    params.forEach(function(param) {
      const parts = param.split('=');
      if (decodeURIComponent(parts[0]) === 'share') {
        share = atob(decodeURIComponent(parts[1]));
      }
    });
  }

  const choices = document.getElementById('choices');
  let numChoices = 0;

  function addChoice(text) {
    const input = document.createElement('input');
    input.setAttribute('id', 'thing-' + numChoices);
    input.setAttribute('type', 'text');
    if (text) {
      input.setAttribute('value', text);
    }
    input.setAttribute('placeholder', 'Thing ' + (numChoices + 1));
    if (share) {
      input.setAttribute('readonly', 'true');
    }
    choices.appendChild(input);
    numChoices += 1;
  }

  if (share) {
    share.split('\0').forEach(function(choice) {
      addChoice(choice);
    });
  }
  else {
    addChoice();
    addChoice();
  }

  function onPick() {
    const pick = Math.floor(Math.random() * Math.floor(numChoices));

    const yourPick = document.getElementById('your-pick');
    yourPick.innerHTML = 'Your pick is:';

    const pickText = document.createElement('div');
    pickText.setAttribute('id', 'your-pick-text');
    pickText.innerText = document.getElementById('thing-' + pick).value;
    yourPick.appendChild(pickText);
  }

  function onAddAnother() {
    addChoice();
  }

  function onShare() {
    const choiceTexts = [];
    for (let i = 0; i < numChoices; i++) {
      choiceTexts.push(document.getElementById('thing-' + i).value);
    }
    const code = btoa(choiceTexts.join('\0')).replace(/=+$/, '');
    window.location.search = '?share=' + code;
  }

  const buttons = document.getElementById('buttons');

  const pickButton = document.createElement('button');
  pickButton.innerText = 'Pick';
  pickButton.addEventListener('click', onPick);
  buttons.appendChild(pickButton);

  if (!share) {
    const addAnotherButton = document.createElement('button');
    addAnotherButton.innerText = 'Add Another Thing';
    addAnotherButton.addEventListener('click', onAddAnother);
    buttons.appendChild(addAnotherButton);

    const shareButton = document.createElement('button');
    shareButton.innerText = 'Share';
    shareButton.addEventListener('click', onShare);
    buttons.appendChild(shareButton);
  }
})();
</script>
<style>

#your-pick {
  text-align: center;
}

#your-pick-text {
  font-size: 150%;
  font-weight: bold;
  margin-left: 8px;
}

input {
  display: block;
  width: 50%;
  margin-top: 4px;
  margin-bottom: 4px;
}

div#buttons {
  margin-top: 16px;
}

button:not(:first-child) {
  margin-left: 4px;
}

button:not(:last-child) {
  margin-right: 4px;
}
</style>
