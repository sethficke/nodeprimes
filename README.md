# nodeprimes
A simple Node.JS program which factors numbers and saves the results to file.


How to run (Windows):
1) Set .js files to open with Node.JS (Google: Change File Associations On Windows)
2) Double click on factor.js to run it in the command line.

How to use (Windows)
Your interface is a simple REPL (read, evaluate, prompt loop).  You can enter any valid JavaScript expression on the command line and it will be evaluated.  

Outputs from factoring operations are serialized to factors.json.

To reset factors.json, run the expression "reset();" on the command line.

To factor a number, run the expression "factor(5);" on the command line, where 5 represents the number you want to factor.

For example, to factor all numbers from 0 to 99 and store the results in factors.json, I can do this: for(var i=0;i<=99;i++){factor(i)}
