import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: any;
  name: string;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getNewUser();
  }

  getNewUser(){
    this.profileService.getRandomUser().pipe(first())
    .subscribe(
      data => {  
        console.log(data.results[0]);
        this.profile = data.results[0];
        this.name = this.profile.name; 
        
        
        // Assign Data
   // document.getElementById('user_photo').getElementsByTagName('img')[0].src = this.profile.picture.large;
      
      this.setData('name', this.profile.name.first+' '+ this.profile.name.last);

      document.getElementById('user_value').innerHTML = this.profile.name.first+' '+ this.profile.name.last;

      this.setData('email', this.profile.email);

      var birthday = new Date(this.profile.dob.date);
      this.setData('birthday', birthday.getMonth() + 1 + '/' + (birthday.getDay() + 1) + '/' +   birthday.getFullYear());
      this.setData('location', this.profile.location.street.number + " " + this.profile.location.street.name);
      this.setData('phone', this.profile.cell);
      this.setData('pass', this.profile.login.password);

      },
      error => {
        console.log(error);
      }
    );
console.log(this.name);
    var liList = Array.prototype.slice.call(document.getElementById("values_list").getElementsByTagName('li'));
    liList.forEach(function(el) {
      el.addEventListener('mouseover', function() {
        liList.forEach(function(el) {
          el.className = el.className.replace(/\bactive\b/,'');
        });
        var item = this;
        item.className += ' active';

        document.getElementById('user_title').innerHTML = item.getAttribute('data-title');
        document.getElementById('user_value').innerHTML = item.getAttribute('data-value');
        
        if(item.getAttribute('data-caps')){
          document.getElementById('user_value').style.textTransform = "lowercase";
        } else {
          document.getElementById('user_value').style.textTransform = "capitalize";
        }
      });
    });

  }

   setData(label, value) {
    var liList = Array.prototype.slice.call(document.getElementsByTagName('li'));

    liList.find(function(el) {
      return el.getAttribute('data-label') === label;
    }).setAttribute('data-value', value);
  }



}
