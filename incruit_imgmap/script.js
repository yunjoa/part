 function convertToALink() {
            var inputText = document.getElementById('inputTextarea').value.trim();
            var imageWidth = parseFloat(document.getElementById('imageWidth').value.trim());
            var imageHeight = parseFloat(document.getElementById('imageHeight').value.trim());

            if (isNaN(imageWidth) || isNaN(imageHeight)) {
                alert('Please enter valid numbers for image width and height.');
                return;
            }

            var regex = /<area shape="(rect|circle|poly)" coords="([^"]+)" href="([^"]+)"(?: alt="([^"]+)")?>/g;
            var convertedText = '<div style="position:relative;">';

            var index = 1; // To generate unique IDs for each <a> tag

            convertedText += inputText.replace(regex, function(match, shape, coords, href, alt) {
                var coordsArray = coords.split(',').map(Number);
                var aTag = '';

                if (shape === 'rect') {
                    var leftPercent = (coordsArray[0] / imageWidth) * 100;
                    var topPercent = (coordsArray[1] / imageHeight) * 100;
                    var rightPercent = (coordsArray[2] / imageWidth) * 100;
                    var bottomPercent = (coordsArray[3] / imageHeight) * 100;
                    var widthPercent = Math.round((rightPercent - leftPercent) * 100) / 100;
                    var heightPercent = Math.round((bottomPercent - topPercent) * 100) / 100;

                    aTag = '<a href="' + href + '" target="_blank" style="position: absolute; left: ' + leftPercent.toFixed(2) + '%; top: ' + topPercent.toFixed(2) + '%; width: ' + widthPercent + '%; height: ' + heightPercent + '%; background: red;';
                    if (alt) {
                        aTag += ' title="' + alt.replace(/"/g, '&quot;') + '"';
                    }
                    aTag += '>' + index + '</a>';
                    index++;
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
            alert('텍스트 복사완료!');
        }
