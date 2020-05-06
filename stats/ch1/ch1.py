import numpy as np
import json
import unittest

class Chapter1Tests(unittest.TestCase):
#     @classmethod
#     def setUpClass(cls):
#         print('I am setupClass')
#         cls.var = "blah"
# 
    def setUp(self):
        print('I am setup')
        self.numItrs = 100000

#     def testExample1(self):
#         rolls = [sum(np.random.randint(0, 2, size=3)) for x in range(self.numItrs)]
#         prob = len(list(filter(lambda x: x == 1, rolls))) / self.numItrs
#         self.assertAlmostEqual(prob, 3/8, delta=0.01)
#         print(f'{prob = }')
# 
#     def testExample2(self):
#         rolls = [sum(np.random.randint(1, 7, size=2)) for x in range(self.numItrs)]
#         probLoss = len(list(filter(lambda x: x == 2 or x == 3 or x == 12, rolls))) / self.numItrs
#         probWin = len(list(filter(lambda x: x == 7 or x == 11, rolls))) / self.numItrs
#         self.assertAlmostEqual(probLoss, 4/36, delta=0.01)
#         self.assertAlmostEqual(probWin, 8/36, delta=0.01)
# 
#         print(f'{probLoss = }')
#         print(f'{probWin = }')
# 
#     def testExample3(self):
#         rolls = [np.random.randint(1, 4, size=2) for x in range(self.numItrs)]
#         prob = len(list(filter(lambda x: 2 in x, rolls))) / self.numItrs
#         self.assertAlmostEqual(prob, 5/9, delta=0.01)
#         print(f'{prob = }')
# 
    def testExample4(self):
        # A coin is tossed until two heads or two tails occur in succession

        rolls = 0
        for x in range(self.numItrs):
            i = 0
            prev = -1

            while True:
                roll = np.random.randint(0, 2, size=1)
                i += 1
                if prev == roll:
                    break
                prev = roll
            if i >= 4:
                rolls += 1

        prob = rolls/self.numItrs
        self.assertAlmostEqual(prob, 1/4, delta=0.01)
        print(f'{prob = }')

    def testExample4ToFile(self):
        # A coin is tossed until two heads or two tails occur in succession

        allRolls = {}
        allRolls['roll'] = []
        for x in range(self.numItrs):
            currSet = []

            while True:
                roll = int(np.random.randint(0, 2, size=1))
                if currSet != [] and roll == currSet[-1]:
                    currSet.append(roll)
                    allRolls['roll'].append(currSet)
                    break
                currSet.append(roll)

        prob = len(list(filter(lambda x: len(x)>=4, allRolls['roll'])))/self.numItrs
        self.assertAlmostEqual(prob, 1/4, delta=0.01)
        print(f'{prob = }')

        with open('00_coin_toss.json', 'w') as fp:
            json.dump(allRolls, fp)

if __name__ == '__main__':
    unittest.main()

