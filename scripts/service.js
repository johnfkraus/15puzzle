(function () {

    // The script location
    var ScriptSrc = (function () {
        var src;
        var i;
        var scripts = document.getElementsByTagName('script'),
            script = scripts[scripts.length - 1];
        if (script.getAttribute.length !== undefined) {
            src = script.src;
        } else {
            src = script.getAttribute('src', -1);
        }
        return src;
    }());

    function GetScriptHostname() {
        // Returns script hostname and port.
        var regex = /http:\/\/([^\/]+)/;
        var m = regex.exec(ScriptSrc);
        if (m !== undefined && m.length > 1) {
            return m[1];
        } else {
            return "error";
        }
    }

    function BitWriter() {
        // encodes as URL-BASE64
        this.str = "";
        this.partial = 0;
        this.partialSize = 0;
        this.table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        this.addBits = function (bits, size) {
            this.partial = (this.partial << size) | bits;
            this.partialSize += size;
            while (this.partialSize >= 6) {
                this.str += this.table.charAt((this.partial >>
                    (this.partialSize - 6)) & 0x3f);
                this.partialSize -= 6;
            }
        };
        this.finish = function () {
            if (this.partialSize) {
                this.str += this.table.charAt(
                    ( this.partial << ( 6 - this.partialSize ) ) & 0x3f);
                this.partialSize = 0;
                this.partial = 0;
            }
        };
    }

    function encodeBase64(str) {
        var writer = new BitWriter();
        for (var n = 0; n < str.length; n++) {
            writer.addBits(str.charCodeAt(n), 8);
        }
        writer.finish();
        return writer.str;
    }

    function encodeUtf8(string) {
        // fronm http://www.webtoolkit.info/
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    function encodeNumber(num) {
        // encodes a number in only as many bytes as required, 7 bits at a time.
        // bit 8 is used to indicate whether another byte follows.
        if (num >= 0x3FFF) {
            return String.fromCharCode(0x80 | ( (num >> 14) & 0x7f )) +
                String.fromCharCode(0x80 | ( (num >> 7) & 0x7f )) +
                String.fromCharCode(num & 0x7f);
        } else if (num >= 0x7F) {
            return String.fromCharCode(0x80 | ( (num >> 7) & 0x7f )) +
                String.fromCharCode(num & 0x7f);
        } else {
            return String.fromCharCode(num);
        }
    }

    function encodeLz77(input) {
        var MinStringLength = 4;
        var output = "";
        var pos = 0;
        var hash = {};
        // set last pos to just after the last chunk.
        var lastPos = input.length - MinStringLength;
        for (var i = MinStringLength; i < input.length; i++) {
            var subs = input.substr(i - MinStringLength, MinStringLength);
            if (hash[subs] === undefined) {
                hash[subs] = [];
            }
            hash[subs].push(i - MinStringLength);
            //document.write("subs[" + subs + "]=" + (pos - MinStringLength) + "<br>");
        }
        // loop until pos reaches the last chunk.
        while (pos < lastPos) {

            // search start is the current position minus the window size, capped
            // at the beginning of the string.
            var matchLength = MinStringLength;
            var foundMatch = false;
            var bestMatch = {distance: 0, length: 0};
            var prefix = input.substr(pos, MinStringLength);
            var matches = hash[prefix];
            // loop until the end of the matched region reaches the current
            // position.
            //while ((searchStart + matchLength) < pos) {
            if (matches !== undefined) {
                for (var i = 0; i < matches.length; i++) {
                    var searchStart = matches[i];
                    if (searchStart + matchLength >= pos) {
                        break;
                    }
                    while (searchStart + matchLength < pos) {
                        // check if string matches.
                        var isValidMatch = (
                            (input.substr(searchStart, matchLength) == input.substr(pos, matchLength))
                            );
                        if (isValidMatch) {
                            // we found at least one match. try for a larger one.
                            var realMatchLength = matchLength;
                            matchLength++;
                            if (foundMatch && (realMatchLength > bestMatch.length)) {
                                bestMatch.distance = pos - searchStart - realMatchLength;
                                bestMatch.length = realMatchLength;
                            }
                            foundMatch = true;
                        } else {
                            break;
                        }
                    }
                }
            }
            if (bestMatch.length) {
                output += String.fromCharCode(0) +
                    encodeNumber(bestMatch.distance) +
                    encodeNumber(bestMatch.length);
                pos += bestMatch.length;
            } else {
                if (input.charCodeAt(pos) !== 0) {
                    output += input.charAt(pos);
                } else {
                    output += String.fromCharCode(0) +
                        String.fromCharCode(0);
                }
                pos++;
            }
        }
        return output + input.slice(pos).replace(/\0/g, "\0\0");
    }

    function getText(node) {
        var text = "";
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            if (child.nodeType == 3) {
                text += child.data;
            } else {
                text += getText(child);
            }
        }
        return text;
    }

    function process(divs) {
        var hostname = GetScriptHostname();
        for (var i = 0; i < divs.length; i++) {
            if (divs[i].className == "wsd" && !divs[i].wsd_processed) {
                divs[i].wsd_processed = true;
                var style = "";
                if (divs[i].attributes["wsd_style"]) {
                    style = "&s=" + divs[i].attributes["wsd_style"].value;
                }
                var text = encodeBase64(encodeLz77(encodeUtf8(getText(divs[i]))));
                hostname = "www.websequencediagrams.com";
                var str = "http://" + hostname + "/cgi-bin/cdraw?" +
                    "lz=" + text + style;
                if (true || str.length < 2048) {
                    for (var j = divs[i].childNodes.length - 1; j >= 0; j--) {
                        divs[i].removeChild(divs[i].childNodes[j]);
                    }
                    var img = document.createElement("img");
                    img.setAttribute("src", str);
                    divs[i].appendChild(img);
                } else {
                    divs[i].insertBefore(document.createTextNode("Diagram too large for web service."), divs[i].firstChild);
                }
            }
        }
    }

    process(document.getElementsByTagName("div"));
    process(document.getElementsByTagName("span"));
})();
