import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ScreenService } from '../../../services/screen.service';

@Component({
  selector: 'app-admineditscreen',
  templateUrl: './admineditscreen.component.html',
  styleUrl: './admineditscreen.component.css'
})
export class AdmineditscreenComponent implements OnInit{

  screenForm!:FormGroup;
  screenId!:number;

  constructor(private fb:FormBuilder,
              private router:Router,
              private screenService:ScreenService,
              private route:ActivatedRoute){};

  ngOnInit(): void {
    this.screenId=this.route.snapshot.params['id'];
    this.screenForm=this.fb.group({
      screen:['',Validators.required],
      totalSeats:[0,[Validators.required,Validators.min(1)]]
    });

    this.loadScreen();
  }

  loadScreen():void{
    this.screenService.getScreenById(this.screenId).subscribe({
      next:(data)=>{
        this.screenForm.patchValue({
          screen:data.screen,
          totalSeats:data.totalSeats
        });
      },
      error:(err)=>{
        alert('Failed to load Screen details!');
        this.router.navigate(['/admin/screens']);
      }
    })
  }

  onSubmit():void{
    if(this.screenForm.invalid) return;
    this.screenService.updateScreen(this.screenId,this.screenForm.value).subscribe({
      next:()=>{
        alert('Screen updated successfully');
        this.router.navigate(['/admin/screens']);
      },
      error:(err)=>{
        console.error(err);
        alert('Error updating screen');
      }
    })
  }
   
  cancel():void{
   this.router.navigate(['/admin/screens']);
  }
  
}
