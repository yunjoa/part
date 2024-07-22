function convertToALink() {
    var inputText = document.getElementById('inputTextarea').value.trim();
    var imageWidth = parseFloat(document.getElementById('imageWidth').value.trim());
    var imageHeight = parseFloat(document.getElementById('imageHeight').value.trim());

    if (isNaN(imageWidth) || isNaN(imageHeight)) {
        alert('이미지 사이즈를 기재해주세요!');
        return;
    }

    var regex = /<area\s+([^>]+)>/g;
    var convertedText = '<div style="position:relative;">';

    convertedText += inputText.replace(regex, function(match, attributes) {
        var shape, coords, href, target, alt;
        
        var shapeMatch = attributes.match(/shape="([^"]*)"/);
        var coordsMatch = attributes.match(/coords="([^"]*)"/);
        var hrefMatch = attributes.match(/href="([^"]*)"/);
        var targetMatch = attributes.match(/target="([^"]*)"/);
        var altMatch = attributes.match(/alt="([^"]*)"/);

        shape = shapeMatch ? shapeMatch[1] : '';
        coords = coordsMatch ? coordsMatch[1] : '';
        href = hrefMatch ? hrefMatch[1] : '';
        target = targetMatch ? targetMatch[1] : '';
        alt = altMatch ? altMatch[1] : '';

        console.log("Shape: ", shape);
        console.log("Coords: ", coords);
        console.log("Href: ", href);
        console.log("Target: ", target);
        console.log("Alt: ", alt);

        if (!shape || !coords) {
            return match;
        }

        var coordsArray = coords.split(',').map(Number);
        var aTag = '';

        if (shape === 'rect') {
            var leftPercent = (coordsArray[0] / imageWidth) * 100;
            var topPercent = (coordsArray[1] / imageHeight) * 100;
            var rightPercent = (coordsArray[2] / imageWidth) * 100;
            var bottomPercent = (coordsArray[3] / imageHeight) * 100;
            var widthPercent = Math.round((rightPercent - leftPercent) * 100) / 100;
            var heightPercent = Math.round((bottomPercent - topPercent) * 100) / 100;

            aTag = '<a style="position: absolute; left: ' + leftPercent.toFixed(2) + '%; top: ' + topPercent.toFixed(2) + '%; width: ' + widthPercent + '%; height: ' + heightPercent + '%; background: red;"';

            if (href) {
                aTag += ' href="' + href + '"';
            }

            if (target) {
                aTag += ' target="' + target.replace(/"/g, '&quot;') + '"';
            }

            if (alt) {
                aTag += ' title="' + alt.replace(/"/g, '&quot;') + '"';
            }
            
            aTag += '></a>';
        }

        return aTag;
    });

    convertedText += '</div>';
    document.getElementById('outputTextarea').value = convertedText;
}


        function copyToClipboard() {
            var outputTextarea = document.getElementById('outputTextarea');
            outputTextarea.select();
            document.execCommand('copy');
            alert('복사완료!');
        }
