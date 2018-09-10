<template>
  <div class="container">
    <md-steppers :md-active-step.sync="active" md-vertical>
      <md-step id="first" md-label="Entitlements"  :md-done.sync="first">
        <!--- Sub-steppers for Stage one -->
        <md-steppers :md-active-step.sync="subactive" md-vertical>
          <md-step id="firstZero" md-label="" md-description="Eligibility" :md-done.sync="firstZero">
            <div class="md-layout">
              <div class="md-layout-item">
                <md-field class="medium-field">
                  <label>What's your age?</label>
                  <md-input v-model="form.age" type="number"></md-input>
                </md-field>
                <div>
                  <span class="soft-title">Employment Type.</span>
                  <md-radio v-model="form.employmentType" value="fulltime">Full-time</md-radio>
                  <md-radio v-model="form.employmentType" value="parttime">Part-time</md-radio>
                  <md-radio v-model="form.employmentType" value="casual">Casual</md-radio>
                </div>
                <br><span class="soft-title">I have worked there within the past 6 years.</span>
                <md-radio v-model="form.sufficientTime" :value="true">Yes</md-radio>
                <md-radio v-model="form.sufficientTime" :value="false">No</md-radio>
                <br>
              </div>
              <div class="md-layout-item">
                <div class="info-box">
                  <span class="soft-title"><md-icon>help</md-icon> How long can I wait?</span>
                  To bring a claim, 6 years or less must have passed since your entitlements were due to be paid. Otherwise, the court is restricted from making an order under s545 of the Fair Work Act 2009
                </div>                
              </div>
            </div>
            <md-button v-if="form.sufficientTime === true" class="md-raised md-primary" @click="setDone('firstZero', 'firstFirst', 'subactive')">Continue to Work History</md-button>
            <md-card class="rejection-box" v-if="form.sufficientTime === false">
              <span class="soft-title"><md-icon>error_outline</md-icon> We can't continue you claim.</span>
              <md-card-content>
                Unfortunately you cannot claim from your employer as too much time has passed.
              </md-card-content>
            </md-card>            
          </md-step>
          <md-step id="firstFirst" md-label="Employee Entitlements" :md-done.sync="firstFirst">
            <div class="md-layout">
              <div class="md-layout-item">
                <span class="soft-title">I've been paid less than $18.93 per hour or $719.20 per week?</span>
                <md-radio v-model="form.paidLess" :value="true">Yes</md-radio>
                <md-radio v-model="form.paidLess" :value="false">No</md-radio>
              </div>
              <div class="md-layout-item">
                <div class="info-box">
                  <span class="soft-title"><md-icon>help</md-icon> About Employee Entitlements</span>
                  Employee entitlements are rules about what employees get at work, such as what hours they work and how often they can have a break. An employee’s minimum entitlements are set out in the National Employment Standards (NES) and awards.
                </div>
              </div>
            </div>
            <md-button class="md-raised md-primary" @click="setDone('firstFirst', 'firstSecond', 'subactive')">Continue with Agreement Selection</md-button>
          </md-step>
          <md-step id="firstSecond" md-label="Employment Agreement" :md-done.sync="firstSecond" >
            <div class="md-layout">
              <div class="md-layout-item">
                <h2>I am working under the following employment contract.</h2>
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
                  <md-field class="medium-field">
                    <label>I work {{form.hoursWorked}} hours per day.</label>
                    <md-input v-model="form.hoursWorked" type="range" max="16" min="0"></md-input>
                  </md-field>
                  <md-field class="medium-field">
                    <label>I work {{form.daysWorked}} days per week.</label>
                    <md-input v-model="form.daysWorked" type="range" max="7" min="0"></md-input>
                  </md-field>
                </div>
              </div>
              <div class="md-layout-item">
                <div class="info-box" ng-if="form.awardLevel">
                  <span class="soft-title"><md-icon>help</md-icon> About your award</span>
                  {{form.levelEnum[form.awardLevel].info}}
                  <br><br>Source: <a href="http://awardviewer.fwo.gov.au/award/show/MA000009#P1884_145415">fwo.gov.au</a>
                </div>
                <div v-if="form.employmentContract" class="warning-box">
                  <span class="soft-title"><md-icon>error_outline</md-icon> Your entitlements</span>
                  <br><b>Your weekly rate: ${{form.levelEnum[form.awardLevel].weekly}} (AUD)</b>
                  <br><b>Your hourly rate: ${{form.levelEnum[form.awardLevel].hourly}} (AUD)</b>
                  <h2>You should be paid atleast ${{getWeeklyWage()}} a week.</h2>
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
              <md-input v-model="form.address" type="text" id="address" name="address" v-gmaps-searchbox=vm />
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
            <br>I'm currently employed here. <br>
            <md-radio v-model="form.stillWorking" :value="true">Yes</md-radio>
            <md-radio v-model="form.stillWorking" :value="false">No</md-radio>
            <md-datepicker class="medium-field" v-model="form.employmentStartDate">
              <label>When was the first day of your employment?</label>
            </md-datepicker>
            <md-datepicker v-if="form.stillWorking === false" class="medium-field" v-model="form.employmentEndDate">
              <label>When did your employment end?</label>
            </md-datepicker>
          </div>
          <div class="md-layout-item">
            <!-- <div class="info-box">
              <span class="soft-title"><md-icon>help</md-icon> Todo</span>
              Todo
            </div> -->
          </div>
        </div>
        <md-button class="md-raised md-primary" @click="setDone('second', 'third')">Start collecting evidence</md-button>
      </md-step>
      <md-step id="third" md-label="Collect Evidence" :md-done.sync="third">
        <md-tabs>
          <md-tab id="contract" md-label="Contract">
            <div class="md-layout">
              <div class="md-layout-item">
                <span class="soft-title">I have a contract with my employer. </span>
                <md-radio v-model="form.hasContract" :value="true">Yes</md-radio>
                <md-radio v-model="form.hasContract" :value="false">No</md-radio>
                <md-field class="medium-field" v-if="form.hasContract === true">
                  <label>Select Contract(s)</label>
                  <md-file v-model="form.contracts" multiple />
                </md-field>
                <md-button class="md-raised md-secondary" v-if="form.hasContract === true">Upload</md-button>
                <md-card class="email-card" v-if="form.hasContract === false">
                  <h3>Request contract(s) via email</h3>
                  <md-field :class="form.employerEmailContents">
                    <label>Email contents</label>
                    <md-textarea required value="Dear <insert employer name>

I am writing to request a copy of my [contract] [delete if unapplicable], [payslip] [delete if unapplicable], and any other business records you may have for inspection.

I note, under reg. 3.42 of the Fair Work Regulations 2009, an employer must make a copy of my records available. If my records are not provided, you may be in breach of the civil remedy provisions are Part 4-1 of the Fair Work Act 2009.

You can contact me on [Insert Number] or send me a copy of these records at [Insert Address and/or Email Address].

I look forward to your response.

Kind regards,
Ellie Peterson">
                      
                    </md-textarea>
                    <span class="md-helper-text">Feel free to edit this automatically generated email</span>
                    <span class="md-error">There is an error</span>
                  </md-field>
                  <md-button class="md-raised md-secondary">Send Email</md-button>
                </md-card>
              </div>
              <div class="md-layout-item">
                <div class="info-box">
                  <span class="soft-title"><md-icon>help</md-icon> How to request business records from your employer</span>
                  Under the Fair Work Act and Fair Work Regulations, your employer must keep business records with respect to your employment for up to 7 years. If you do not have a copy of your contract or payslips, or any other business documents which you believe would be relevant to your claim, please use the auto-filled letter beneath to contact your ex/employer.
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
                <md-button class="md-raised md-primary" @click="setOpal = true">Process</md-button>
                <div class="info-box left-box" v-if="setOpal == true">
                  <span class="soft-title"><md-icon>help</md-icon> My Opal Records (since start of employment)</span>
                  Your opal records have been processed. 
                  <small>
                    <h3>Total hours traveled: 857</h3>
                    <h3>Total overtime earned: $2145</h3>
                  </small>
                </div>
              </div>
              <div class="md-layout-item">
                <div class="info-box">
                  <span class="soft-title"><md-icon>help</md-icon> Obtaining Opal Records</span>
                  <div class="md-layout">
                    <div class="md-layout-item"> 
                        An Opal activity statement is a record of the trips and top ups you’ve made on your Opal card. If you’ve registered your Opal card, you can access your activity statement by logging in to your account on the Opal website.<br><br> Unregistered Opal cards can view your last 10 transactions by entering your Opal card number and security code. 
                        <br><br>Guide to get report data: <a href="https://www.opal.com.au/en/customer-care/opal-activity-statement/">https://www.opal.com.au/en/customer-care/opal-activity-statement/</a>
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
                  <span class="soft-title"><md-icon>help</md-icon> What are other documents?</span>
                  Other documents that you consider relevant can be uploaded here. Such information may include any text messages or emails that provide proof of employment or pay. 
                </div>
              </div>
            </div>
          </md-tab>
          <md-tab id="cal" md-label="My Calendar">
            <img class="cal-img" src="../assets/cal.png" />
          </md-tab>
        </md-tabs>
        <md-button class="md-raised md-primary" @click="setDone('third', 'fourth')">I have finished uploading all evidence.</md-button>
      </md-step>
      <md-step id="fourth" md-label="Calculate Entitlements" :md-done.sync="fourth">
        <!--- Sub-steppers for Stage four -->
        <div class="md-layout">
          <div class="md-layout-item">
            <md-button class="md-raised md-primary" @click="calculatedEntitlements();">Calculate my entitlements</md-button>
            <div class="warning-box left-box">
              <span class="soft-title">My Entitlements</span>
              <span class="soft-title">Total number of days entitled (since employment commenced): <b>{{this.daysEntitled}}</b></span>
              <span class="soft-title">Total pay entitled (per day): <b>${{this.payEntitled}}</b></span>
            </div>
          </div>
          <div class="md-layout-item">
            <div class="info-box">
              <span class="soft-title"><md-icon>help</md-icon> How Entitlements are Calculated</span>
              <img src="../assets/entitlements.png" />
            </div>
          </div>
        </div>
      </md-step>
      <md-step id="fifth" md-label="Create Letter of Demand" :md-done.sync="fifth">
        <!--- Sub-steppers for Stage four -->
        <div class="md-layout">
          <div class="md-layout-item">
            <form method="get" target="_blank" action="/lod.pdf">
              <md-button class="md-raised md-secondary" type="submit">Download letter of demand</md-button>
            </form>
          </div>
          <div class="md-layout-item">
          </div>
        </div>
      </md-step>
      <md-step id="sixth" md-label="Further steps" :md-done.sync="sixth">
        <!--- Sub-steppers for Stage four -->
        <h2>Community Legal Centers</h2>
        <iframe
          width="600"
          height="750"
          frameborder="0" style="border:0"
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB_hWH944ixwXX1x3KXIAXynY99IDfR2FQ
            &q=Space+Needle,Seattle+WA" allowfullscreen>
        </iframe>
        <br><br>Basement, Kings Cross Library/Neighbourhood Centre — 50-52 Darlinghurst Road, Kings Cross NSW 2011
        <br><br>Telephone: (02) 9332 1966
        <br>sms: 0466 724 979
        <br>Email: iclc@iclc.org.au
      </md-step>
    </md-steppers>
  </div>
</template>

<script>
export default {
  name: 'Form',
  data: () => ({
    active: 'first',
    subactive: 'firstZero',
    first: false,
      firstZero: false,
      firstFirst: false,
      firstSecond: false,
      firstThird: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
    setOpal: false,
    secondStepError: null,
    form: {
      // STEP 1
      sufficientTime: true,
      paidLess: true,
      age: 21,
      employmentContract: null,
      awardLevel: 'level1',
      daysWorked: 5,
      hoursWorked: 7,
      awardClass: 'Hospitality Industry (General) Award 2010',
      employmentType: 'fulltime',
      levelEnum: {
        level1: {
          weekly: 739.90,
          hourly: 19.47,
          info: 'Food and beverage attendant grade 1 means an employee who is engaged in any of the following: picking up glasses; emptying ashtrays; general assistance to food and beverage attendants of a higher grade not including service to customers; removing food plates; setting and/or wiping down tables; cleaning and tidying of associated areas'
        },
        level2: {
          weekly: 768.30,
          hourly: 20.22,
          info: '',
        },
        level3: {
          weekly: 794.70,
          hourly: 20.91,
          info: 'Food and beverage attendant grade 3 means an employee who has the appropriate level of training and is engaged in any of the following: supplying,dispensing or mixing of liquor including the sale of liquor from the bottle department; assisting in the cellar or bottle department,where duties could include working up to four hours per day (averaged over the relevant work cycle) in the cellar without supervision; undertaking general waiting duties of both food and/or beverage including cleaning of tables;',
        },
        level4: {
          weekly: 837.40,
          hourly: 22.04,
          info: 'Food and beverage attendant (tradesperson) grade 4 means an employee who: supervises food and beverage attendants of a lower level;  has completed an apprenticeship in waiting or who has passed the appropriate trade test and carries out specialised skilled duties in a fine dining room or restaurant; full control of a cellar or liquor store (including the receipt,delivery and recording of goods within such an area);  is a full-time or part-time employee who holds an approval as a Gaming Machine Manager pursuant to the Gaming Machines Act 1992 (SA); is a casual employee who holds an approval as a Gaming Machine Manager pursuant to the Gaming Machines Act 1992 (SA) and undertakes the duties of a Gaming Machine Manager for any engagement. ',
        },
        level5: {
          weekly: 889.90,
          hourly: 23.42,
          info: 'Food and beverage supervisor Level 5 means: An employee who has the appropriate level of training including a supervisory course and has the responsibility for supervision,training and co-ordination of Food and Beverage staff,or stock control for a bar or series of bars; Is an employee who holds an approval as a Responsible Person pursuant to the Liquor Licensing Act 1997 (SA) and is appointed by the employer or Manager to act as a Responsible Person. Where a person has been approved as a Responsible Person,whether full-time,regular part-time or casual,and is performing the duties of a Responsible Person pursuant to a direction given by the employer or manager,they are to be paid at Level 5 for the time actually worked as a Responsible Person only.',
        },
        employmentStartDate: null,
        employmentEndDate: null,
      },
      // STEP 2
      fullName: 'Ellie Peterson',
      address: '42 Wallaby Way, Sydney NSW 2000',
      phoneNumber: '0470359083',
      spokenEmployer: false,
      spokenFairwork: false,
      stillWorking: true,
      // MISC
      daysEntitled: null,
      payEntitled: null,
    }
  }),
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
    },
    calculatedEntitlements() {
      const startDay = this.form.employmentStartDate ? new Date(this.form.employmentStartDate) : new Date();
      const endDay = this.form.employmentEndDate ? new Date(this.form.employmentEndDate) : new Date();
      const weeksWorked = Math.ceil((Math.abs(startDay.getTime() - endDay.getTime())/(1000*60*60*24))/7);
      const hoursWorked = this.form.hoursWorked * this.form.daysWorked * weeksWorked;
      const wage = this.form.levelEnum[this.form.awardLevel].hourly;
      this.daysEntitled = Number((hoursWorked - 0)/10.428571).toFixed(0);
      this.payEntitled = 0;
      if (this.form.hoursWorked < 8) {
        this.payEntitled = wage * this.form.hoursWorked;
      } else if (this.form.hoursWorked <= 10) {
        this.payEntitled = (8 * wage) + ((this.form.hoursWorked-8)*1.5*wage);
      } else {
        this.payEntitled = (8 * wage)  + (2*1.5*wage) + ((this.form.hoursWorked-10)* 2* wage)
      }      
    }
  },
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
.error-box {
  margin: 0;
  padding: 20px;
  border-style: dashed;
  border-width: thin;
  border-color: red;
  margin-bottom: 20px;
}
.rejection-box {
  margin: 2em;
  padding: 1em;
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
.container {
  padding: 2em;
}
.left-box {
  margin-top: 20px;
  width: 90%;
}
.cal-img {
  width: 800px;
}
</style>