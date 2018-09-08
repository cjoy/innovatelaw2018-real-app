<template>
  <div>
    <md-steppers :md-active-step.sync="active" md-vertical>
      <md-step id="first" md-label="Entitlements"  :md-done.sync="first">
        <!--- Sub-steppers for Stage one -->
        <md-steppers :md-active-step.sync="subactive" md-vertical>
          <md-step id="firstFirst" md-label="Work History" md-description="Todo" :md-done.sync="firstFirst">
            <div class="md-layout">
              <div class="md-layout-item">
                <h2>I have worked there within the past 6 years.</h2>
                <md-radio v-model="form.sufficientTime" :value="true">Yes</md-radio>
                <md-radio v-model="form.sufficientTime" :value="false">No</md-radio>
              </div>
              <div class="md-layout-item">
                <div class="info-box">
                  <span class="soft-title"><md-icon>help</md-icon> Todo</span>
                  Todo
                </div>
              </div>
            </div>
            <md-card class="rejection-box" v-if="form.sufficientTime === false">
              <md-card-header><md-icon>error_outline</md-icon> We can't continue you claim...</md-card-header>
              <md-card-content>
                Todo
              </md-card-content>
            </md-card>
            <md-button v-if="form.sufficientTime === true" class="md-raised md-primary" @click="setDone('firstFirst', 'firstSecond', 'subactive')">Continue with Agreement Selection</md-button>
          </md-step>
          <md-step id="firstSecond" md-label="Employment Agreement" md-description="Todo" :md-done.sync="firstSecond" >
            <div class="md-layout">
              <div class="md-layout-item">
                <h2>I am working under the following employment contract:</h2>
                <md-field class="medium-field">
                  <label for="employmentContract">Employment Contract</label>
                  <md-select v-model="form.employmentContract" name="employmentContract" id="employmentContract">
                    <md-option value="Award">Award</md-option>
                    <md-option value="Registered Agreement">Registered Agreement</md-option>
                    <md-option value="Contract">Contract</md-option>
                    <md-option value="NES">None of the above (NES)</md-option>
                  </md-select>
                </md-field>
                <div v-if="form.employmentContract">
                  <md-field class="medium-field">
                    <label for="awardClass">Award Class</label>
                    <md-input v-model="form.awardClass" name="awardClass" id="awardClass"></md-input>
                  </md-field>
                  <md-field class="medium-field">
                    <label for="awardLevel">Award Level</label>
                    <md-select v-model="form.awardLevel" name="awardLevel" id="awardLevel">
                      <md-option value="level1">Level 1</md-option>
                      <md-option value="level2">Level 2</md-option>
                      <md-option value="level4">Level 3</md-option>
                      <md-option value="level4">Level 4</md-option>
                      <md-option value="level5">Level 5</md-option>
                    </md-select>
                  </md-field>
                  <div>
                    Employment Type<br>
                    <md-radio v-model="form.employmentType" value="fulltime">Full-time</md-radio>
                    <md-radio v-model="form.employmentType" value="parttime">Part-time</md-radio>
                    <md-radio v-model="form.employmentType" value="casual">Casual</md-radio>
                  </div>
                  <md-field class="medium-field">
                    <label>I work {{form.hoursWorked}} hours per day.</label>
                    <md-input v-model="form.hoursWorked" type="range" max="24" min="0"></md-input>
                  </md-field>
                  <md-field class="medium-field">
                    <label>I work {{form.daysWorked}} days per week.</label>
                    <md-input v-model="form.daysWorked" type="range" max="24" min="0"></md-input>
                  </md-field>
                </div>
              </div>
              <div class="md-layout-item">
                <div class="info-box">
                  <span class="soft-title"><md-icon>help</md-icon> About your award</span>
                  (ii) Food and beverage attendant grade 2 means an employee who has not achieved the appropriate level of training and who is engaged in any of the following:
                  <br>- Supplying, dispensing or mixing of liquor including the sale of liquor from the bottle department;
                  <br>- Assisting in the cellar or bottle department;
                  <br>- Undertaking general waiting duties of both food and/or beverage including cleaning of tables;
                  <br>- Receipt of monies;
                  <br>- Attending a snack bar;
                  <br>- Engaged on delivery duties.
                  <br><br>Source: <a href="http://awardviewer.fwo.gov.au/award/show/MA000009#P1884_145415">fwo.gov.au</a>
                </div>
                <div v-if="form.employmentContract" class="warning-box">
                  <span class="soft-title"><md-icon>error_outline</md-icon> Your entitlements</span>
                  <br><b>Your weekly rate: ${{form.levelEnum[form.awardLevel].weekly}} (AUD)</b>
                  <br><b>Your hourly rate: ${{form.levelEnum[form.awardLevel].hourly}} (AUD)</b>
                  <h2>You should be paid atleast ${{getWeeklyWage()}} hours a week.</h2>
                </div>
              </div>
            </div>
            <md-button v-if="form.employmentContract" class="md-raised md-primary" @click="setDone('first', 'second')">Continue to background information</md-button>
          </md-step>
        </md-steppers> 
      </md-step>
      <md-step id="second" md-label="Background Information" :md-done.sync="second">
        <!--- Sub-steppers for Stage two -->
        <div class="md-layout">
          <div class="md-layout-item">
            <md-field class="medium-field">
              <label for="fullName">Full Name</label>
              <md-input v-model="form.fullName" type="text" id="fulName" name="fullName"/>
            </md-field>
            <md-field class="medium-field">
              <label for="fullName">Residential Address</label>
              <md-input v-model="form.address" type="text" id="address" name="address"/>
            </md-field>
            <md-field class="medium-field">
              <label for="phoneNumber">Phone Number</label>
              <md-input v-model="form.phoneNumber" type="text" id="phoneNumber" name="phoneNumber"/>
            </md-field>
            I have spoken to my employer regarding this matter. <br>
            <md-radio v-model="form.spokenEmployer" :value="true">Yes</md-radio>
            <md-radio v-model="form.spokenEmployer" :value="false">No</md-radio>
            <br>I have contacted Fairwork regarding this matter. <br>
            <md-radio v-model="form.spokenFairwork" :value="true">Yes</md-radio>
            <md-radio v-model="form.spokenFairwork" :value="false">No</md-radio>
            <br>I'm currently still employed here. <br>
            <md-radio v-model="form.stillWorking" :value="true">Yes</md-radio>
            <md-radio v-model="form.stillWorking" :value="false">No</md-radio>
            <md-datepicker class="medium-field" v-model="form.employmentStartDate">
              <label>Select Employment Start Date</label>
            </md-datepicker>
            <md-datepicker v-if="form.stillWorking === false" class="medium-field" v-model="form.employmentEndDate">
              <label>Select Employment End Date</label>
            </md-datepicker>
          </div>
          <div class="md-layout-item">
            <div class="info-box">
              <span class="soft-title"><md-icon>help</md-icon> Todo</span>
              Todo
            </div>
          </div>
        </div>
        <md-button class="md-raised md-primary" @click="setDone('second', 'third')">Start collecting evidence</md-button>
      </md-step>
      <md-step id="third" md-label="Collect Evidence" :md-done.sync="third">
        <md-tabs>
          <md-tab id="contract" md-label="Contract">
            <div class="md-layout">
              <div class="md-layout-item">
                <br>I have a contract with my employer. <br>
                <md-radio v-model="form.hasContract" :value="true">Yes</md-radio>
                <md-radio v-model="form.hasContract" :value="false">No</md-radio>
                <md-field class="medium-field" v-if="form.hasContract === true">
                  <label>Select Contract(s)</label>
                  <md-file v-model="form.contracts" multiple />
                </md-field>
                <md-button class="md-raised md-secondary" v-if="form.hasContract === true">Upload</md-button>
                <md-card class="email-card" v-if="form.hasContract === false">
                  <h3>Request contract(s) via email</h3>
                  <md-field :class="messageClass">
                    <label>Employer's email address</label>
                    <md-input v-model="form.employerEmailAddress" required></md-input>
                    <span class="md-error">There is an error</span>
                  </md-field>
                  <md-field :class="form.employerEmailContents">
                    <label>Email contents</label>
                    <md-textarea v-model="e" required></md-textarea>
                    <span class="md-helper-text">Feel free to edit this automatically generated email</span>
                    <span class="md-error">There is an error</span>
                  </md-field>
                  <md-button class="md-raised md-secondary">Send Email</md-button>
                </md-card>
              </div>
              <div class="md-layout-item">
                <div class="info-box">
                  <span class="soft-title"><md-icon>help</md-icon> Todo</span>
                  Todo
                </div>
              </div>
            </div>
          </md-tab>
          <md-tab id="payslip" md-label="Payslip">
            <md-field class="medium-field">
              <label>Select Payslip(s)</label>
              <md-file v-model="form.contracts" multiple />
            </md-field>
            <md-button class="md-raised md-secondary">Upload</md-button>
          </md-tab>
          <md-tab id="invoice" md-label="Invoice">
            <md-field class="medium-field">
              <label>Select Invoice(s)</label>
              <md-file v-model="form.invoice" multiple />
            </md-field>
            <md-button class="md-raised md-secondary">Upload</md-button>
          </md-tab>
          <md-tab id="bank" md-label="Bank Statement">
            <md-field class="medium-field">
              <label>Select Bank Statement(s)</label>
              <md-file v-model="form.bankStatements" multiple />
            </md-field>
            <md-button class="md-raised md-secondary">Upload</md-button>
          </md-tab>
          <md-tab id="opal" md-label="Opal">
            <div class="md-layout">
              <div class="md-layout-item">
                <md-field class="medium-field">
                  <label>Select Opal report(s)</label>
                  <md-file v-model="form.opal" multiple />
                </md-field>
                <md-button class="md-raised md-secondary">Upload</md-button>
              </div>
              <div class="md-layout-item">
                <div class="info-box">
                  <span class="soft-title"><md-icon>help</md-icon> Obtaining Opal Records</span>
                  <div class="md-layout">
                    <div class="md-layout-item"> 
                    </div>
                    <div class="md-layout-item"> 
                      <img src="../assets/opal.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </md-tab>
          <md-tab id="others" md-label="Other documents">
            <div class="md-layout">
              <div class="md-layout-item">
                <md-field class="medium-field">
                  <label>Select document(s)</label>
                  <md-file v-model="form.opal" multiple />
                </md-field>
              </div>
              <div class="md-layout-item">
                <div class="info-box">
                  <span class="soft-title"><md-icon>help</md-icon> Todo</span>
                  Todo
                </div>
              </div>
            </div>
          </md-tab>
        </md-tabs>
        <md-button class="md-raised md-primary" @click="setDone('third', 'fourth')">I have finished uploading all evidence.</md-button>
      </md-step>
      <md-step id="fourth" md-label="Calculate Entitlements" :md-done.sync="fourth">
        <!--- Sub-steppers for Stage four -->
        This was a triumph
        <md-button class="md-raised md-primary" @click="setBack('third', 'fourth')">Back</md-button>
        <md-button class="md-raised md-primary" @click="setDone('fourth', 'fifth')">Continue</md-button>
      </md-step>
      <md-step id="fifth" md-label="Create Letter of Demand" :md-done.sync="fifth">
        <!--- Sub-steppers for Stage four -->
        This was a triumph
        <md-button class="md-raised md-primary" @click="setBack('fourth', 'fifth')">Back</md-button>
        <md-button class="md-raised md-primary" @click="setDone('fifth', 'sixth')">Continue</md-button>
      </md-step>
      <md-step id="sixth" md-label="Further steps" :md-done.sync="sixth">
        <!--- Sub-steppers for Stage four -->
        This was a triumph
        <md-button class="md-raised md-primary" @click="setBack('fifth', 'sixth')">Back</md-button>
        <md-button class="md-raised md-primary" @click="setDone('sixth')">Done</md-button>
      </md-step>
    </md-steppers>
  </div>
</template>

<script>
  export default {
    name: 'Form',
    data: () => ({
      active: 'first',
      subactive: 'firstFirst',
      first: false,
        firstFirst: false,
        firstSecond: false,
        firstThird: false,
      second: false,
      third: false,
      fourth: false,
      fifth: false,
      sixth: false,
      secondStepError: null,
      form: {
        // STEP 1
        sufficientTime: null,
        employmentContract: null,
        awardLevel: 'level2',
        daysWorked: 5,
        hoursWorked: 7,
        awardClass: 'Hospitality Industry (General) Award 2010',
        employmentType: 'fulltime',
        levelEnum: {
          level1: {
            weekly: 739.90,
            hourly: 19.47,
          },
          level2: {
            weekly: 768.30,
            hourly: 20.22,
          },
          level3: {
            weekly: 794.70,
            hourly: 20.91,
          },
          level4: {
            weekly: 837.40,
            hourly: 22.04,
          },
          level5: {
            weekly: 889.90,
            hourly: 23.42,
          },
        },
        // STEP 2
        fullName: 'Sally Peterson',
        address: '42 Wallaby Way, Sydney NSW 2000',
        phoneNumber: '0470359083',
        spokenEmployer: false,
        spokenFairwork: false,
        stillWorking: true,
      }
    }),
    computed: {
    },
    methods: {
      setDone (id, index, subactive) {
        this[id] = true
        if (index && !subactive) {
          this.active = index
        }
        if (index && subactive == 'subactive') {
          this.subactive = index
        }
      },
      setBack(id, index) {
        this.active = id;
        this[index] = false;
      },
      getWeeklyWage() {
        return String(Number(this.form.levelEnum[this.form.awardLevel].hourly * this.form.hoursWorked * this.form.daysWorked).toFixed(2))
      }
    }
  }
</script>

<style lang="scss" scoped>
.info-box {
  margin: 0;
  padding: 20px;
  border-style: dashed;
  border-width: thin;
  border-color: #33a1e0;
  margin-bottom: 20px;
}
.warning-box {
  margin: 0;
  padding: 20px;
  border-style: dashed;
  border-width: thin;
  border-color: orange;
  margin-bottom: 20px;
}
.rejection-box {
  margin: 2em;
  width: 450px;
}
.medium-field {
  width: 500px;
}
.soft-title {
  margin-bottom: 0.5em;
  font-size: 1.3em;
  font-weight: 300;
  display: block;
}
.email-card {
  padding: 10px;
  margin-bottom: 10px;
  margin-left: -30px;
}
</style>