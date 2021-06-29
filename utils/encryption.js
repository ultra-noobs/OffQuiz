const mapping = [64,  59,  75,  43,  41, 34,  49,  94,  39,  38,  61,  35, 105,  47,  88,  80,  32, 72,  48,  52,  81,  58, 102, 124, 57, 111,  36, 116,  46, 73,  85, 104, 108, 117, 109, 121, 77,  70,  76,  33,  51, 89,  67, 126,  79,  63,  66,  78, 125,  90, 123,  92,  40, 98,  86, 114,  53, 119,  60,  54, 101,  45, 113,  68,  84, 74, 122, 120,  65,  50,  44,  82,96,  62,  42,  37,  87, 69,  55, 112,  71,  56,  91, 100,83, 107,  95, 103, 110, 97,  93, 118, 115, 106,  99]
const charToAscii = (a)=>{
    return a.charCodeAt(0);
}

const asciiToChar = (a) =>{
    return String.fromCharCode(a);
}

const shiftText = (text,n)=>{
    var shiftMsg = "";
    for(let i=n;i<text.length;i++){
        shiftMsg +=text[i];
    }
    for(let i=0;i<n;i++){
        shiftMsg +=text[i];
    }
    return shiftMsg;
}

function compress(c) {
    var x = 'charCodeAt',
        b, e = {},
        f = c.split(""),
        d = [],
        a = f[0],
        g = 256;
    for (b = 1; b < f.length; b++) c = f[b], null != e[a + c] ? a += c : (d.push(1 < a.length ? e[a] : a[x](0)), e[a + c] = g, g++, a = c);
    d.push(1 < a.length ? e[a] : a[x](0));
    for (b = 0; b < d.length; b++) d[b] = String.fromCharCode(d[b]);
    return d.join("")
}

const encryptMessage = (text)=>{
    var encryptedMsg = "";
    for(let i=0;i<text.length;i++){
        const val = charToAscii(text[i]);
        encryptedMsg += asciiToChar(mapping[val-32]);
    }
    var shiftedMsg = shiftText(encryptedMsg,20);
    var compressedText = compress(shiftedMsg);
    return compressedText;
}

module.exports = {encryptMessage}
