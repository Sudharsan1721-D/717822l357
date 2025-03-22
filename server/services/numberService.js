const numberService = require('../services/numberService');
const { calculateAverage } = require('../utils/helpers');

async function getNumbers(req, res, next) {
  try {
    const { numberid } = req.params;
    
    if (!['p', 'f', 'e', 'r'].includes(numberid)) {
      return res.status(400).json({ 
        error: 'Invalid number ID. Use p (prime), f (Fibonacci), e (even), or r (random).' 
      });
    }
    
    const windowPrevState = [...numberService.getStoredNumbers(numberid)];
    
    const newNumbers = await numberService.fetchNumbers(numberid);
    
    numberService.addUniqueNumbersToStorage(numberid, newNumbers);
    
    const windowCurrState = numberService.getStoredNumbers(numberid);
    
    const response = {
      windowPrevState,
      windowCurrState,
      numbers: newNumbers,
      avg: parseFloat(calculateAverage(windowCurrState).toFixed(2))
    };
    
    res.json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getNumbers
};