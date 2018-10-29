import { JsonRules } from "dotup-ts-json-rules";

class Startup {
  public static main() {
    this.TestJsonRules(new JsonRules());
  }


  static TestJsonRules(jsonRules: JsonRules) {

    const data = Startup.getSampleData();

    const source = data.Source;
    const driver = data.Source['Driver'];
    const bike = data.Source['Bike'];
    const dk = bike;
    const ruleSet = data.RuleSet[0];

    try {
      const jsonIsValid = jsonRules.IsValid(source, ruleSet);
      if (jsonIsValid) {
        console.log('valid');
      } else {
        console.log('invalid');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  static getSampleData(){
    return {
      "Source": {
        "Driver": {
          "Age": 45,
          "Gender": 1,
          "Name":"Peter"
        },
        "Bike": {
          "Ccm": 250,
          "Strokes": 2,
          "Cylinder": 1,
          "YOM": "1979-01-02"
        }
      },
      "RuleSet": [
        {
          "raceClass": "11",
          "selectors": {
            "Driver": {
              "Age": {
                "min": 1,
                "max": 50
              }
            },
            "Bike": {
              "Ccm": {
                "min": 250,
                "max": 450
              }
            }
          },
          "rules": {
            "Driver": {
              "Name":{
                "equals":"Peter"
              },
              "Gender": {
                "min": 1,
                "max": 2
              },
              "Age": {
                "1": {
                  "min": 40,
                  "max": 999
                },
                "2": {
                  "min": 50,
                  "max": 999
                },
                "selector": "Gender"
              }
            },
            "Bike": {
              "Ccm": {
                "2": {
                  "min": 1,
                  "max": 250
                },
                "4": {
                  "min": 1,
                  "max": 450
                },
                "selector": "Strokes"
              },
              "YOM": {
                "minDate": "1979-01-01"
              }
            }
          }
        }
      ]
    };

  }
}

Startup.main();