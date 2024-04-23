function factorial(n) {
    if (n === 0 || n === 1) return 1
    return n * factorial(n - 1)
}

function combination(n, r) {
    return factorial(n) / (factorial(r) * factorial(n - r))
}

function pascalTriangle(n) {
    const triangle = []
    for (let i = 0; i < n; ++i) {
        const row = []
        for (let j = 0; j <= i; ++j) {
            row.push(combination(i, j))
        }
        triangle.push(row)
    }
    return triangle
}

function test() {
    const tests = [1, 3, 4]
    tests.forEach(test => {
        console.log(pascalTriangle(test));
    })
}

test()