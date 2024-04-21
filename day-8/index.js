function isPalindrome(string) {
    return string.split('').reverse().join('') === string
}

function checkPalindromeArray(strings) {
    return strings.map(string => isPalindrome(string))
}

function test() {
    const tests = [
        ['racecar', 'abcd', 'bab', 'kala', 'madam', 'carac'],
        ['bad', 'good', 'evil'],
    ]
    tests.forEach(test => {
        console.log(checkPalindromeArray(test));
    })
}

test()