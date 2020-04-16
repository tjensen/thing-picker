# Thing Picker

<div id="your-pick"></div>

## Things

<div id="choices"></div>

<div id="buttons"></div>

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

input::placeholder {
  color: #dddddd;
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

<script src="assets/js/picker.js"></script>

<script async src="https://www.googletagmanager.com/gtag/js?id=UA-146795359-2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-146795359-2');
</script>
