let lastBettingTime = 0;
let tokenIndex = 0;
const TELEGRAM_BOT_TOKEN = "";
const ADMIN_ID = "";
let isAuthenticated = true;
const tokens = ["demo", "demo", "demo"];
function getAuthorizationToken() {
  const _0x4aec8d = tokens[tokenIndex];
  tokenIndex = (tokenIndex + 1) % tokens.length;
  return "Bearer " + _0x4aec8d;
}
function getRan(_0x19a4e2, _0xdc3819) {
  return Math.random() * (_0xdc3819 - _0x19a4e2) + _0x19a4e2;
}
async function checkSignal() {
  let _0x111ba4 = getRan(1.1, 5).toFixed(2);
  const _0x230377 = "https://crash-gateway-cc-cr.gamedev-tech.cc/state?id_n=1play_rocketqueen&id_i=1";
  const _0x1afe37 = await fetch(_0x230377, {
    headers: {
      Authorization: getAuthorizationToken()
    }
  });
  const _0x345708 = await _0x1afe37.json();
  const _0x44ff78 = _0x345708.current_state;
  let _0x54b01c = document.getElementById("responseText");
  if (!_0x54b01c) {
    console.error("Element with ID responseText not found.");
    return;
  }
  if (_0x44ff78 === "betting" && Date.now() - lastBettingTime > 5000) {
    let _0x1b09a0 = _0x111ba4 + "x";
    document.getElementById("responseText").textContent = _0x1b09a0;
    localStorage.setItem("resultText", _0x1b09a0);
    _0x54b01c.className = "text betting";
    lastBettingTime = Date.now();
  } else if (_0x44ff78 === "ending") {
    _0x54b01c.textContent = "Waiting..";
    _0x54b01c.className = "text fly";
  }
}
function fetchDataAndUpdate() {
  const _0x10bf94 = "https://crash-gateway-cc-cr.gamedev-tech.cc/state?id_n=1play_rocketqueen&id_i=1";
  fetch(_0x10bf94, {
    headers: {
      Authorization: getAuthorizationToken()
    }
  }).then(_0x15fd7f => _0x15fd7f.json()).then(_0x1b7809 => {
    const _0xe9181e = parseFloat(_0x1b7809.current_coefficients);
    updateCoefficients(_0xe9181e);
  }).catch(_0x479c62 => console.error("Error fetching data:", _0x479c62));
}
function updateCoefficients(_0x55e627) {
  const _0xbc11dc = document.getElementById("coefficients");
  if (!_0xbc11dc) {
    console.error("Element with ID coefficients not found.");
    return;
  }
  if (_0x55e627 !== 1) {
    _0xbc11dc.innerText = "x" + _0x55e627;
    _0xbc11dc.classList.remove("smallt");
    _0xbc11dc.classList.add("kif");
  }
}
fetchDataAndUpdate();
setInterval(fetchDataAndUpdate, 100);
let intervalId = setInterval(checkSignal, 100);
checkSignal();
initTelegramBot().then(() => {
  if (isAuthenticated) {
    fetchDataAndUpdate();
    setInterval(fetchDataAndUpdate, 100);
    setInterval(checkSignal, 100);
    checkSignal();
  }
});