(function () {
  function setButtonState(button, text, isCopied) {
    button.textContent = text;
    if (isCopied) {
      button.classList.add("copied");
    } else {
      button.classList.remove("copied");
    }
  }

  function getCodeText(button) {
    const block = button.closest(".setup-guide-code-block");
    if (!block) {
      return "";
    }

    const code = block.querySelector("pre code, code");
    return code ? code.innerText : "";
  }

  async function handleCopyClick(event) {
    const button = event.currentTarget;
    const codeText = getCodeText(button);
    if (!codeText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(codeText);
      setButtonState(button, "Copied", true);
      window.setTimeout(() => setButtonState(button, "Copy", false), 1500);
    } catch (error) {
      setButtonState(button, "Failed", false);
      window.setTimeout(() => setButtonState(button, "Copy", false), 1500);
    }
  }

  document.querySelectorAll(".js-copy-code").forEach((button) => {
    button.addEventListener("click", handleCopyClick);
  });
})();
