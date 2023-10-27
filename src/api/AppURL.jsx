class AppURL{
  static BaseURL = "http://127.0.0.1:8000/api"
  static UserData = this.BaseURL+"/user"
  static UserRegister = this.BaseURL+"/register"
  static UserLogin = this.BaseURL+"/login"
  static UserPortal = this.BaseURL+"/portal"
  static UserFirm = this.BaseURL+"/firm"
  static UserScanning = this.BaseURL+"/scanning"
  static UserSubFirm(firm){
    return this.BaseURL+"/subfirm/"+firm; 
 }
  static UserAllScan(firm){
    return this.BaseURL+"/allscan/"+firm; 
 }
  static UserAllScanPending(firm){
    return this.BaseURL+"/allscanpending/"+firm; 
 }
  static UserAllScanScanned(firm){
    return this.BaseURL+"/allscanscanned/"+firm; 
 }
}

export default AppURL