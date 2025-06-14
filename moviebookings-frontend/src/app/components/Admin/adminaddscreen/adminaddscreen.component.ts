import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScreenService } from '../../../services/screen.service';

@Component({
  selector: 'app-adminaddscreen',
  templateUrl: './adminaddscreen.component.html',
  styleUrl: './adminaddscreen.component.css'
})
export class AdminaddscreenComponent implements OnInit{

  screenForm!:FormGroup;
  constructor(private fb:FormBuilder,
              private router:Router,
              private screenService:ScreenService ){};

  ngOnInit(): void {
    this.screenForm=this.fb.group({
      screen:['',Validators.required],
      totalSeats:['',[Validators.required,Validators.min(1)]]
    });
  }    
  
  onSubmit():void{
    if(this.screenForm.invalid) return;

    const screen={screen:this.screenForm.value.screen,
                  totalSeats:this.screenForm.value.totalSeats };
    this.screenService.addScreen(screen).subscribe({
      next:()=>{
        alert('Screen added successfully');
        this.router.navigate(['/admin/screens']);
      },
      error:(err)=>{
        console.error('Error adding screen:',err);
        alert('Error adding Screen');
      }
    })
  }

  cancel():void{
    this.router.navigate(['/admin/screens']);
  }
}
