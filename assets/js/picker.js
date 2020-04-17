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

  const yourPick = document.getElementById('your-pick');

  function showPick(pickValue) {
      yourPick.innerHTML = 'Your pick is:';

      const pick = Math.floor(Math.random() * Math.floor(numChoices));

      const pickText = document.createElement('div');
      pickText.setAttribute('id', 'your-pick-text');
      pickText.innerText = pickValue
      yourPick.appendChild(pickText);
  }

  function onTimer(remaining) {
    if (remaining <= 0) {
      const pick = Math.floor(Math.random() * Math.floor(numChoices));
      showPick(document.getElementById('thing-' + pick).value);
    }
    else
    {
      setTimeout(function() {
        onTimer(remaining - 1);
      }, 50);

      let pickText = ''
      for (let i = 0; i < 20; i++) {
        pickText += String.fromCharCode(Math.floor(Math.random() * 3) + 0x2591)
      }

      showPick(pickText);
    }
  }

  function onPick() {
    onTimer(20);
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
