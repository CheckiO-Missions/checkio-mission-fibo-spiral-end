"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            "input": [0],
            "answer": [0, 0],
        },
        {
            "input": [1],
            "answer": [1, -1],
        },
        {
            "input": [2],
            "answer": [2, 0],
        },
        {
            "input": [3],
            "answer": [0, 2],
        },
        {
            "input": [4],
            "answer": [-3, -1],
        },
    ],
    "Extra": [
        {
            "input": [5],
            "answer": [2, -6],
        },
        {
            "input": [6],
            "answer": [10, 2],
        },
        {
            "input": [7],
            "answer": [-3, 15],
        },
        {
            "input": [8],
            "answer": [-24, -6],
        },
        {
            "input": [15],
            "answer": [-168, 714],
        },
        {
            "input": [25],
            "answer": [20737, -87841],
        },
    ]
}
