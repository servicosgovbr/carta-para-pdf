describe("Calculator", function () {
    var calculator = new Calculator();

    describe("Parse data", function () {
        it("should return array from a string", function () {
            expect(calculator.parse_data("1,2")).toEqual(jasmine.any(Array));
        });

        it("should return a int array", function () {
            expect(calculator.parse_data("1,2")).toEqual([1, 2]);
        });

        it("should return a int array", function () {
            expect(calculator.parse_data("1, 2")).toEqual([1, 2]);
        });
    });

    describe("Sequence length", function () {
        it("should returns length of two", function () {
            expect(calculator.sequence_length([1, 2])).toEqual(2);
        });

        it("should returns length of four", function () {
            expect(calculator.sequence_length([1, 2, 3, 4])).toEqual(4);
        });
    });

    describe("Maximum", function () {
        it("should returns maximum number", function () {
            expect(calculator.maximum([1, 3, 2])).toEqual(3);
        })
    });

    describe("Minimium", function () {
        it("should returns minimium number", function () {
            expect(calculator.minimium([5, 4, 1, 3, 2])).toEqual(1);
        })
    })

    describe("Average", function () {
        it("should returns average number", function () {
            expect(calculator.average([1, 2, 3, 4, 5])).toEqual(3);
        })
    })
});