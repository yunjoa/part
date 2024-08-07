function toggleSizeInputs() {
  var conversionType = document.querySelector(
    'input[name="conversionType"]:checked'
  ).value;
  var sizeWrap = document.querySelector(".size_wrap");
  if (conversionType === "convertToALink") {
    sizeWrap.style.display = "block";
  } else {
    sizeWrap.style.display = "none";
  }
}
document.querySelectorAll('input[name="conversionType"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    var description = this.getAttribute("data-description");
    document.getElementById("descriptionContainer").innerText = description;
    toggleSizeInputs();
  });
});

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  toggleSizeInputs();
});

function convertText() {
  var input = document.getElementById("inputText").value;

  // 선택된 라디오 버튼 값 가져오기
  var conversionType = document.querySelector(
    'input[name="conversionType"]:checked'
  ).value;

  // 텍스트 변환 결과 초기화
  var output = "";

  // 변환 유형에 따른 처리
  switch (conversionType) {
    case "option1":
      var lines = input.split("\n");

      // 빈 줄 제거
      lines = lines.filter((line) => line.trim() !== "");

      // 번호가 붙은 줄의 번호 제거 (일반 숫자와 유니코드 숫자 모두, 문장 앞에 있을 때만)
      lines = lines.map((line) =>
        line.replace(
          /^\s*(\d+|①|②|③|④|⑤|⑥|⑦|⑧|⑨|⑩|⑪|⑫|⑬|⑭|⑮|⑯|⑰|⑱|⑲|⑳|⑴|⑵|⑶|⑷|⑸|⑹|⑺|⑻|⑼|⑽|⑾|⑿|⒀|⒁|⒂|⒃|⒄|⒅|⒆|⒇|⒈|⒉|⒊|⒋|⒌|⒍|⒎|⒏|⒐|⒑|⒒|⒓|⒔|⒕|⒖|⒗|⒘|⒙|⒚|⒛|⒜|⒝|⒞|⒟|⒠|⒡|⒢|⒣|⒤|⒥|⒦|⒧|⒨|⒩|⒪|⒫|⒬|⒭|⒮|⒯|⒰|⒱|⒲|⒳|⒴|⒵|Ⓐ|Ⓑ|Ⓒ|Ⓓ|Ⓔ|Ⓕ|Ⓖ|Ⓗ|Ⓘ|Ⓙ|Ⓚ|Ⓛ|Ⓜ|Ⓝ|Ⓞ|Ⓟ|Ⓠ|Ⓡ|Ⓢ|Ⓣ|Ⓤ|Ⓥ|Ⓧ|Ⓨ|Ⓩ|ⓐ|ⓑ|ⓒ|ⓓ|ⓔ|ⓕ|ⓖ|ⓗ|ⓘ|ⓙ|ⓚ|ⓛ|ⓜ|ⓝ|ⓞ|ⓟ|ⓠ|ⓡ|ⓢ|ⓣ|ⓤ|ⓥ|ⓦ|ⓧ|ⓨ|⓪|⓫|⓬|⓭|⓮|⓯|⓰|⓱|⓲|⓳|⓴|⓵|⓶|⓷|⓸|⓹|⓺|⓻|⓼|⓽|⓾|⓿)\)?\s*/g,
          ""
        )
      );

      // 문장의 시작에 있는 특정 기호나 숫자 제거
      lines = lines.map((line) =>
        line.replace(
          /^(가|나|다|라|마|바|사|아|자|차|카|타|파|하)\.\s*|㉠|㉡|㉢|㉣|㉤|㉥|㉦|㉧|㉨|㉩|㉪|㉫|㉬|㉭|㉮|㉯|㉰|㉱|㉲|㉳|㉴|㉵|㉶|㉷|㉸|㉹|㉺|㉻|가\)|나\)|다\)|라\)|마\)|바\)|사\)|아\)|자\)|차\)|카\)|타\)|파\)|하\)\s*/g,
          ""
        )
      );

      // 각 줄을 <li> 태그로 감싸기
      lines.forEach((line) => {
        output += "<li>" + line + "</li>\n";
      });
      break;
    case "tag_li":
      // 각 줄을 <li> 태그로 감싸기
      var lines = input.split("\n");
      for (var i = 0; i < lines.length; i++) {
        output += "<li>" + lines[i] + "</li>\n";
      }
      break;

    case "removeEmptyLines":
      // 빈 줄 제거
      var lines = input.split("\n");
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].trim() !== "") {
          output += lines[i] + "\n";
        }
      }
      break;

    case "option2":
      var lines = input.split("\n");

      // removeEmptyLines
      var nonEmptyLines = lines.filter(function (line) {
        return line.trim() !== "";
      });

      var ulContent = "";
      var olContent = "";
      var currentUlChar = "";
      var inOl = false;
      var inUl = false;

      function closeTags() {
        if (inOl) {
          output += "<ol>\n" + olContent + "</ol>\n";
          olContent = "";
          inOl = false;
        }
        if (inUl) {
          output += "<ul>\n" + ulContent + "</ul>\n";
          ulContent = "";
          inUl = false;
        }
      }

      function getStartingChar(line) {
        return line.trim().charAt(0);
      }

      for (var i = 0; i < nonEmptyLines.length; i++) {
        var line = nonEmptyLines[i].trim();
        var startingChar = getStartingChar(line);

        // Check if the line matches the removeNumberedLines pattern
        if (
          /^\s*(\d+|①|②|③|④|⑤|⑥|⑦|⑧|⑨|⑩|⑪|⑫|⑬|⑭|⑮|⑯|⑰|⑱|⑲|⑳|⑴|⑵|⑶|⑷|⑸|⑹|⑺|⑻|⑼|⑽|⑾|⑿|⒀|⒁|⒂|⒃|⒄|⒅|⒆|⒇|⒈|⒉|⒊|⒋|⒌|⒍|⒎|⒏|⒐|⒑|⒒|⒓|⒔|⒕|⒖|⒗|⒘|⒙|⒚|⒛|⒜|⒝|⒞|⒟|⒠|⒡|⒢|⒣|⒤|⒥|⒦|⒧|⒨|⒩|⒪|⒫|⒬|⒭|⒮|⒯|⒰|⒱|⒲|⒳|⒴|⒵|Ⓐ|Ⓑ|Ⓒ|Ⓓ|Ⓔ|Ⓕ|Ⓖ|Ⓗ|Ⓘ|Ⓙ|Ⓚ|Ⓛ|Ⓜ|Ⓝ|Ⓞ|Ⓟ|Ⓠ|Ⓡ|Ⓢ|Ⓣ|Ⓤ|Ⓥ|Ⓧ|Ⓨ|Ⓩ|ⓐ|ⓑ|ⓒ|ⓓ|ⓔ|ⓕ|ⓖ|ⓗ|ⓘ|ⓙ|ⓚ|ⓛ|ⓜ|ⓝ|ⓞ|ⓟ|ⓠ|ⓡ|ⓢ|ⓣ|ⓤ|ⓥ|ⓦ|ⓧ|ⓨ|⓪|⓫|⓬|⓭|⓮|⓯|⓰|⓱|⓲|⓳|⓴|⓵|⓶|⓷|⓸|⓹|⓺|⓻|⓼|⓽|⓾|⓿)\)?\s*/.test(
            line
          )
        ) {
          line = line.replace(
            /^\s*(\d+|①|②|③|④|⑤|⑥|⑦|⑧|⑨|⑩|⑪|⑫|⑬|⑭|⑮|⑯|⑰|⑱|⑲|⑳|⑴|⑵|⑶|⑷|⑸|⑹|⑺|⑻|⑼|⑽|⑾|⑿|⒀|⒁|⒂|⒃|⒄|⒅|⒆|⒇|⒈|⒉|⒊|⒋|⒌|⒍|⒎|⒏|⒐|⒑|⒒|⒓|⒔|⒕|⒖|⒗|⒘|⒙|⒚|⒛|⒜|⒝|⒞|⒟|⒠|⒡|⒢|⒣|⒤|⒥|⒦|⒧|⒨|⒩|⒪|⒫|⒬|⒭|⒮|⒯|⒰|⒱|⒲|⒳|⒴|⒵|Ⓐ|Ⓑ|Ⓒ|Ⓓ|Ⓔ|Ⓕ|Ⓖ|Ⓗ|Ⓘ|Ⓙ|Ⓚ|Ⓛ|Ⓜ|Ⓝ|Ⓞ|Ⓟ|Ⓠ|Ⓡ|Ⓢ|Ⓣ|Ⓤ|Ⓥ|Ⓧ|Ⓨ|Ⓩ|ⓐ|ⓑ|ⓒ|ⓓ|ⓔ|ⓕ|ⓖ|ⓗ|ⓘ|ⓙ|ⓚ|ⓛ|ⓜ|ⓝ|ⓞ|ⓟ|ⓠ|ⓡ|ⓢ|ⓣ|ⓤ|ⓥ|ⓦ|ⓧ|ⓨ|⓪|⓫|⓬|⓭|⓮|⓯|⓰|⓱|⓲|⓳|⓴|⓵|⓶|⓷|⓸|⓹|⓺|⓻|⓼|⓽|⓾|⓿)\)?\s*/,
            ""
          );
          if (!inOl) {
            closeTags();
            inOl = true;
          }
          olContent += "<li>" + line + "</li>\n";
        }
        // Check if the line matches the removeSpecialStartingChars pattern
        else if (
          /^(가|나|다|라|마|바|사|아|자|차|카|타|파|하)\.\s*|㉠|㉡|㉢|㉣|㉤|㉥|㉦|㉧|㉨|㉩|㉪|㉫|㉬|㉭|㉮|㉯|㉰|㉱|㉲|㉳|㉴|㉵|㉶|㉷|㉸|㉹|㉺|㉻|가\)|나\)|다\)|라\)|마\)|바\)|사\)|아\)|자\)|차\)|카\)|타\)|파\)|하\)\s*/.test(
            line
          )
        ) {
          line = line.replace(
            /^(가|나|다|라|마|바|사|아|자|차|카|타|파|하)\.\s*|㉠|㉡|㉢|㉣|㉤|㉥|㉦|㉧|㉨|㉩|㉪|㉫|㉬|㉭|㉮|㉯|㉰|㉱|㉲|㉳|㉴|㉵|㉶|㉷|㉸|㉹|㉺|㉻|가\)|나\)|다\)|라\)|마\)|바\)|사\)|아\)|자\)|차\)|카\)|타\)|파\)|하\)\s*/,
            ""
          );
          if (!inOl) {
            closeTags();
            inOl = true;
          }
          olContent += "<li>" + line + "</li>\n";
        } else {
          if (!inUl) {
            closeTags();
            currentUlChar = startingChar;
            inUl = true;
          } else if (startingChar !== currentUlChar) {
            closeTags();
            currentUlChar = startingChar;
          }
          ulContent += "<li>" + line + "</li>\n";
        }
      }

      closeTags();
      break;

    case "removeNumberedLines":
      // 번호가 붙은 줄의 번호 제거 (일반 숫자와 유니코드 숫자 모두, 문장 앞에 있을 때만)
      var lines = input.split("\n");
      for (var i = 0; i < lines.length; i++) {
        // 일반 숫자와 유니코드 숫자가 문장 앞에 있을 때 제거
        lines[i] = lines[i].replace(
          /^\s*(\d+|①|②|③|④|⑤|⑥|⑦|⑧|⑨|⑩|⑪|⑫|⑬|⑭|⑮|⑯|⑰|⑱|⑲|⑳|⑴|⑵|⑶|⑷|⑸|⑹|⑺|⑻|⑼|⑽|⑾|⑿|⒀|⒁|⒂|⒃|⒄|⒅|⒆|⒇|⒈|⒉|⒊|⒋|⒌|⒍|⒎|⒏|⒐|⒑|⒒|⒓|⒔|⒕|⒖|⒗|⒘|⒙|⒚|⒛|⒜|⒝|⒞|⒟|⒠|⒡|⒢|⒣|⒤|⒥|⒦|⒧|⒨|⒩|⒪|⒫|⒬|⒭|⒮|⒯|⒰|⒱|⒲|⒳|⒴|⒵|Ⓐ|Ⓑ|Ⓒ|Ⓓ|Ⓔ|Ⓕ|Ⓖ|Ⓗ|Ⓘ|Ⓙ|Ⓚ|Ⓛ|Ⓜ|Ⓝ|Ⓞ|Ⓟ|Ⓠ|Ⓡ|Ⓢ|Ⓣ|Ⓤ|Ⓥ|Ⓧ|Ⓨ|Ⓩ|ⓐ|ⓑ|ⓒ|ⓓ|ⓔ|ⓕ|ⓖ|ⓗ|ⓘ|ⓙ|ⓚ|ⓛ|ⓜ|ⓝ|ⓞ|ⓟ|ⓠ|ⓡ|ⓢ|ⓣ|ⓤ|ⓥ|ⓦ|ⓧ|ⓨ|⓪|⓫|⓬|⓭|⓮|⓯|⓰|⓱|⓲|⓳|⓴|⓵|⓶|⓷|⓸|⓹|⓺|⓻|⓼|⓽|⓾|⓿)\)?\s*/g,
          ""
        );
        output += lines[i] + "\n";
      }
      break;

    case "removeSpecialStartingChars":
      // 문장의 시작에 있는 특정 기호나 숫자 제거
      var lines = input.split("\n");
      for (var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace(
          /^(가|나|다|라|마|바|사|아|자|차|카|타|파|하)\.\s*|㉠|㉡|㉢|㉣|㉤|㉥|㉦|㉧|㉨|㉩|㉪|㉫|㉬|㉭|㉮|㉯|㉰|㉱|㉲|㉳|㉴|㉵|㉶|㉷|㉸|㉹|㉺|㉻|가\)|나\)|다\)|라\)|마\)|바\)|사\)|아\)|자\)|차\)|카\)|타\)|파\)|하\)\s*/g,
          ""
        );
        output += lines[i] + "\n";
      }
      break;

    case "convertToALink":
      var imageWidth = parseFloat(
        document.getElementById("imageWidth").value.trim()
      );
      var imageHeight = parseFloat(
        document.getElementById("imageHeight").value.trim()
      );

      if (isNaN(imageWidth) || isNaN(imageHeight)) {
        alert("이미지 사이즈를 기재해주세요!");
        return;
      }

      var regex = /<area\s+([^>]+)>/g;
      var convertedText = '<div style="position:relative;">';

      convertedText += input.replace(regex, function (match, attributes) {
        var shape, coords, href, target, alt;

        var shapeMatch = attributes.match(/shape="([^"]*)"/);
        var coordsMatch = attributes.match(/coords="([^"]*)"/);
        var hrefMatch = attributes.match(/href="([^"]*)"/);
        var targetMatch = attributes.match(/target="([^"]*)"/);
        var altMatch = attributes.match(/alt="([^"]*)"/);

        shape = shapeMatch ? shapeMatch[1] : "";
        coords = coordsMatch ? coordsMatch[1] : "";
        href = hrefMatch ? hrefMatch[1] : "";
        target = targetMatch ? targetMatch[1] : "";
        alt = altMatch ? altMatch[1] : "";

        if (!shape || !coords) {
          return match;
        }

        var coordsArray = coords.split(",").map(Number);
        var aTag = "";

        if (shape === "rect") {
          var leftPercent = (coordsArray[0] / imageWidth) * 100;
          var topPercent = (coordsArray[1] / imageHeight) * 100;
          var rightPercent = (coordsArray[2] / imageWidth) * 100;
          var bottomPercent = (coordsArray[3] / imageHeight) * 100;
          var widthPercent =
            Math.round((rightPercent - leftPercent) * 100) / 100;
          var heightPercent =
            Math.round((bottomPercent - topPercent) * 100) / 100;

          aTag =
            '<a style="position: absolute; left: ' +
            leftPercent.toFixed(2) +
            "%; top: " +
            topPercent.toFixed(2) +
            "%; width: " +
            widthPercent +
            "%; height: " +
            heightPercent +
            '%; background: red;"';

          if (href) {
            aTag += ' href="' + href + '"';
          }

          if (target) {
            aTag += ' target="' + target.replace(/"/g, "&quot;") + '"';
          }

          if (alt) {
            aTag += ' title="' + alt.replace(/"/g, "&quot;") + '"';
          }

          aTag += "></a>";
        }

        return aTag;
      });

      convertedText += "</div>";
      output = convertedText;
      break;

    default:
      break;
  }

  // 결과를 출력 칸에 표시
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

// 라디오 버튼의 변환 유형 설명 업데이트
document.querySelectorAll('input[name="conversionType"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    var description = this.getAttribute("data-description");
    document.getElementById("descriptionContainer").innerText = description;
  });
});
