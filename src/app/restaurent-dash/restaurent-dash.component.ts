import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css'],
})
export class RestaurentDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurentModelObj :RestaurentData = new RestaurentData;
  allRestaurentData : any;
  showAdd!:boolean;
  showBtn!:boolean;
  constructor(private formBuilder: FormBuilder,private api:ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    });
    this.getAllData()

  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showBtn=false;
  }
//Now subscribing ou data which is maped via Services..0
  addRestro(){
    this.restaurentModelObj.name= this.formValue.value.name;
    this.restaurentModelObj.email= this.formValue.value.email;
    this.restaurentModelObj.mobile= this.formValue.value.mobile;
    this.restaurentModelObj.address= this.formValue.value.address;
    this.restaurentModelObj.services= this.formValue.value.services;

    this.api.postRestaurant(this.restaurentModelObj).subscribe(res=>{
      console.log(res);
      alert("Restaurent Record Added Successfull");
      this.formValue.reset();
      this.getAllData();
    },
    err=>{
      alert("Something Went Wrong");
    }
    )
  }
  //Get All Data
  getAllData(){
    this.api.getRestaurent().subscribe(res=>{
      this.allRestaurentData = res;
    })
  }

  deleteRecords(data:any){
    this.api.deleteRestaurent(data.id).subscribe(res=>{
      alert("Record Deleted Successfully");
      this.getAllData();
    })
  }
  onEditResto(data:any){
    this.showAdd=false;
    this.showBtn=true;
    this.restaurentModelObj.id= data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }
  updateRestro(){
    this.restaurentModelObj.name= this.formValue.value.name;
    this.restaurentModelObj.email= this.formValue.value.email;
    this.restaurentModelObj.mobile= this.formValue.value.mobile;
    this.restaurentModelObj.address= this.formValue.value.address;
    this.restaurentModelObj.services= this.formValue.value.services;

    this.api.updateRestaurent(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
      alert("Record Updated");

    })
  }
}
