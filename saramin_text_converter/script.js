function convertText() {
  var input = document.getElementById("inputText").value;

  // 선택된 라디오 버튼 값 가져오기
  var conversionType = document.querySelector(
    'input[name="conversionType"]:checked'
  ).value;

  // 선택된 변환 유형에 따라 텍스트 변환
  var output = "";
  if (conversionType === "oddEven") {
    var lines = input.split("\n");
    for (var i = 0; i < lines.length; i += 2) {
      output +=
        "ㆍ" + lines[i] + (lines[i + 1] ? " : " + lines[i + 1] : "") + "\n";
    }
  } else if (conversionType === "prependBullet") {
    input = input.replace(/^"|"\s*$/gm, "");
    var lines = input.split("\n");
    for (var i = 0; i < lines.length; i++) {
      output += "ㆍ" + lines[i] + "\n";
    }
  } else if (conversionType === "removeEmptyLines") {
    input = input.replace(/^"|"\s*$/gm, "");
    var lines = input.split("\n");
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].trim() !== "") {
        output += lines[i] + "\n";
      }
    }
  } else if (conversionType === "removeNumberedLines") {
    var lines = input.split("\n");
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].replace(/^"\s*|\s*"$/g, "");
      lines[i] = lines[i].replace(/^\s*\d+\)?\.?\s*/g, "ㆍ");
      output += lines[i] + "\n";
    }
  }

  document.getElementById("outputText").innerText = output;
}

function copyText() {
  // 출력 칸의 텍스트를 가져오기
  var text = document.getElementById("outputText").innerText;

  // 텍스트를 클립보드에 복사
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("텍스트가 복사완료!");
    })
    .catch((err) => {
      console.error("복사 실패ㅠㅠ:", err);
    });
}

document.querySelectorAll('input[name="conversionType"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    var description = this.getAttribute("data-description");
    document.getElementById("descriptionContainer").innerText = description;
  });
});
