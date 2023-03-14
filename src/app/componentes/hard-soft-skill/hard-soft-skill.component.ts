import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-hard-soft-skill',
  templateUrl: './hard-soft-skill.component.html',
  styleUrls: ['./hard-soft-skill.component.css']
})

export class HardSoftSkillComponent implements OnInit {

  soft:any[] = [];
  hard:any[] = [];
  skillForm:FormGroup;
  resp:any='';
  tipoSkill:any[] = [
    {name:'Hard Skill'},
    {name:'Soft Skill'}
  ]
  skills:any[]=[];

  constructor(private portfolioService:PortfolioService, private formBuilder:FormBuilder){}

  ngOnInit():void {
    this.hard = [],
    this.soft = [],
    this.portfolioService.obtenerSkill().subscribe(data=>{
      for (let i = 0; i < data.length; i++) {
        this.skills.push(data[i]);
        if(data[i].tipo_skill.id===1){
          data[i].color=this.colorHEX();
          this.hard.push(data[i])
        } else {
          data[i].color=this.colorHEX();
          this.soft.push(data[i])
        }
      }      
    })
    this.skillForm = this.initForm();
    this.resp='';
  }

  initForm(skill?:any):FormGroup {
    return this.formBuilder.group({
      id: [skill?.id],
      nombre: [skill?.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      porcentaje:[skill?.porcentaje,[Validators.required, Validators.min(1), Validators.max(100)]],
      tipo_skill:[skill?.tipo_skill.id, [Validators.required, Validators.max(2)]],
      persona:[skill?.persona.id],
    });
  }

  reload() {
    this.ngOnInit();
  }

  resetForm(){
    this.skillForm.reset();
  }

  abrirModal(skill:any):void{
    this.skillForm = this.initForm(skill);
  }

  editarSkills(skill:any){
    this.skillForm.controls['tipo_skill'].setValue({id: Number(this.skillForm.value.tipo_skill)})
    this.skillForm.controls['persona'].setValue({id: Number(this.skillForm.value.persona)})
    skill=this.skillForm.value
    // console.log('Form->', skill);
    this.portfolioService.editarSkill(skill).subscribe(data => {
      this.resp = data
      console.log(this.resp);
      if(this.resp == 200){
        return data = data;
      } else {
        this.resp='error';        
        return data=this.resp;
      }
    })
  }

  nuevoSkills():void{
    this.skillForm.controls['tipo_skill'].setValue({id: Number(this.skillForm.value.tipo_skill)})
    this.skillForm.controls['persona'].setValue({id: Number(1)})
    // console.log('Form->', this.skillForm.value);
    // console.log('entre nuevoSkill Skill');
    this.portfolioService.nuevoSkill(this.skillForm.value).subscribe(data => {
      this.resp = data
      console.log(this.resp);
      if(this.resp == 200){
        return data = data;
      } else {
        this.resp='error';
        return data = this.resp;
      }
    })
  }

  eliminarSkills(id:number){
    this.skillForm.controls['id'].setValue(id)
    this.portfolioService.eliminarEdu(this.skillForm.value.id).subscribe(
      data => {
      this.resp = data
      if(this.resp == 200){
        return this.resp;
      } else {
        this.resp='error';
        return data = this.resp;
      }
      }
    )
  }
  
  generarLetra(){
    var letras:any [] = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
    let numero:number = Math.floor(Math.random()*15);
    return letras[numero];
  }
    
  colorHEX(){
    var coolor:string = "";
    for(var i=0;i<6;i++){
      coolor = coolor + this.generarLetra() ;
    }
    return "#" + coolor;
  }

}
