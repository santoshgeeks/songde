import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl=environment.baseUrl
  currentUser = JSON.parse(sessionStorage.getItem("user")  || '{}')
  constructor(private http: HttpClient) { }

  login(user:any){
    console.log(user);
    
  let url=this.baseUrl+"/obtain_auth_token/"
    return this.http.post(url, user);
}
getLanguages(){
  const url=this.baseUrl+"/language/?type="
  return this.http.get(url)
}
getAllsetion(){
  const url=this.baseUrl+"/profile/hide/section/?user_slug=kchandra.p"
  return this.http.get(url)
}
getInstuments(){
  const url=this.baseUrl+"/band-roles/"
  return this.http.get(url)
}
getGener(){
  const url = this.baseUrl+"/genre/?type=&lng="
  return this.http.get(url)
}
bandMembers(){
  const url= this.baseUrl+"/band-members/?user_slug="+this.currentUser.result.slug_username
  return this.http.get(url)
}
userPersonalDetails(){
  console.log(this.currentUser);
  
  const url=this.baseUrl+"/profile/personal_details/?user_slug="+this.currentUser.result.slug_username
  return this.http.get(url)
}
opportunity(){
  const url=this.baseUrl+"/user_opportunity_badges/?user_slug="+this.currentUser.result.slug_username
  return this.http.get(url)
}
socialMedia(){
  const url=this.baseUrl+"/profile/social_links/?user_slug="+this.currentUser.result.slug_username
  return this.http.get(url)
}
achievement(page:any){
  const url=this.baseUrl+"/profile/achievements/v2/?user_slug=kchandra.p&limit=4&offset="+page
  return this.http.get(url)
}
quote(){
  const url=this.baseUrl+"/profile/quote/v2/?user_slug="+this.currentUser.result.slug_username
  return this.http.get(url)
}

livePerformence(pageData:any){
  const url=this.baseUrl+"/profile/live_performance/v2/?user_slug="+
  this.currentUser.result.slug_username+"&"+"limit="+pageData.limit+"&"+"offset="+pageData.pageNo
  return this.http.get(url)
}
press(){
  const url=this.baseUrl+"/profile/press/v2/?user_slug=kchandra.p&limit=2&offset=0"
  return this.http.get(url)
}
video(){
  const url=this.baseUrl+"/profile/media?user_slug="+this.currentUser.result.slug_username+"&type=video"+"&limit=10&offset=0"
  return this.http.get(url)
}
music(){
  const url=this.baseUrl+"/profile/songs/?user_slug=kchandra.p&limit=10&offset=0"
  return this.http.get(url)
}
album(){
  const url=this.baseUrl+"/profile/media?user_slug="+this.currentUser.result.slug_username+"&type=album"+"&limit=10&offset=0"
  return this.http.get(url)
}
playlist(){
  const url=this.baseUrl+"/profile/media?user_slug="+this.currentUser.result.slug_username+"&type=playlist"+"&limit=10&offset=0"
  return this.http.get(url)
}
songs(){
  const url=this.baseUrl+"/profile/media?user_slug="+this.currentUser.result.slug_username+"&type=song"+"&limit=10&offset=0"
  return this.http.get(url)
}

photos(){
  const url= this.baseUrl+"/profile/gallery/?user_slug="+this.currentUser.result.slug_username
  return this.http.get(url)
}
enquiry(){
  const url= this.baseUrl+"/profile/enquiry/?user_slug="+this.currentUser.result.slug_username
  return this.http.get(url)
}
downloadAssets(data:any){
  const url= this.baseUrl+"/profile/gallery/"
  return this.http.post(url,data)
}
editEnquiry(data:any){
  const url=this.baseUrl+"/profile/edit/"
  return this.http.put(url,data)
}
allBusiness(){
  const url= this.baseUrl+"/profile/enquiry/all/"
  return this.http.get(url)
}

deletePhoto(data:any){
  const url=this.baseUrl+"/profile/gallery/?img_id="+data.img_id
  return this.http.delete(url)
}
editQuote(data:any){
  const url=this.baseUrl+"/profile/artist_quote/"
  return this.http.put(url,data)
}

downloadtechandlogi(){
  const url=this.baseUrl+"/techrider/?artist_slug="+this.currentUser.result.slug_username
  return this.http.get(url)
}
// post methods
hideSection(data:any){
  const url=this.baseUrl+"/profile/hide/section/"
  return this.http.post(url,data)
}
highlight(data:any){
  const url=this.baseUrl+"/highlight_media/"
  return this.http.post(url,data)
}

addQuotes(data:any){
  const url=this.baseUrl+"/profile/quote/v2/"
  return this.http.post(url,data)
}
addLivePerEvent(data:any){
  console.log(data);
  const url=this.baseUrl+"/profile/live_performance/v2/"
  return this.http.post(url,data)
}
getCountry(){
  const url=this.baseUrl+"/country/"
  return this.http.get(url)
}
getCAtegory(){
  const url=this.baseUrl+"/artistcat/"
  return this.http.get(url)
}
addAchivements(data:any){
  const url=this.baseUrl+"/profile/achievements/v2/"
  return this.http.post(url,data)
}
addInPress(data:any){
  const url=this.baseUrl+"/profile/press/v2/"
  return this.http.post(url,data)
}
addPhotos(data:any){
  const url=this.baseUrl+"/profile/gallery/"
  return this.http.post(url, data)
}
updateCoverPic(data:any){
  const url= this.baseUrl+"/update_profile_cover_pic/"
  return this.http.post(url, data)
}
addBandMember(data:any){
  const url=this.baseUrl+"/band-members/"
  return this.http.post(url, data)
}

uploadLogotipe(data:any){
  const url= this.baseUrl+"/update_profile_cover_pic/"
  return this.http.post(url,data)
}
uploadTechRider(data:any){
  const url= this.baseUrl+"/techrider/"
  return this.http.post(url,data)
}
// edit services

updateLivePerformence(data:any){
  const url=this.baseUrl+"/profile/live_performance/v2/"
  return this.http.put(url,data)
}
editProfile(data:any){
  const url= this.baseUrl+"/profile/edit/"
  return this.http.put(url,data)
}

updateAchivemnt(data:any){
  const url= this.baseUrl+"/profile/achievements/"
  return this.http.put(url, data)
}
editInPress(data:any){
  const url =this.baseUrl+"/profile/press_release/"
  return this.http.put(url, data)
}
editAbout(data:any){
  const url =this.baseUrl+"/profile/edit/"
  return this.http.put(url,data)
}
}
