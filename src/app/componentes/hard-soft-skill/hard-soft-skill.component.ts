import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PortfolioService } from 'src/app/servicios/Portfolio/portfolio.service';

@Component({
  selector: 'app-hard-soft-skill',
  templateUrl: './hard-soft-skill.component.html',
  styleUrls: ['./hard-soft-skill.component.css']
})

export class HardSoftSkillComponent {

  soft:any[] = [];
  hard:any[] = [];
  skillForm:FormGroup;
  resp:any='';
  mISelect:any;

  constructor(private portfolioService:PortfolioService, private formBuilder:FormBuilder){}

  ngOnInit():void {
    this.portfolioService.obtenerSkill().subscribe(data=>{
      console.log(data);      
      for (let i = 0; i < data.length; i++) {
        if(data[i].tipo_skill.id===1){
          this.hard.push(data[i])
        } else {
          this.soft.push(data[i])
        }
      }
    })
    this.skillForm = this.initForm();
    this.resp='';
  }

  
  public persona = new FormArray([
    new FormControl({id:1}),
  ]);

  initForm(skill?:any):FormGroup {
    return this.formBuilder.group({
      id: [skill?.id],
      nombre: [skill?.nombre],
      porcentaje:[skill?.porcentaje],
      tipo_skill:[skill?.tipo_skill.id],
      persona:[this.persona.value[0]],
      // persona_id:[skill?.persona_id]
    });
  }

  reload() {
    this.ngOnInit();
  }

  abrirModal(skill:any):void{
    this.skillForm = this.initForm(skill);
    this.mISelect=skill?.tipo_skill;
  }

  
  editarSkills(exp:any){
    console.log('Form->', this.skillForm.value);
    this.skillForm.controls['tipo_skill'].setValue({id: Number(this.skillForm.value.tipo_skill)})
    exp=this.skillForm.value
    this.portfolioService.editarSkill(exp).subscribe(data => {
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
    this.skillForm.controls['tipo_empleo'].setValue({id: Number(this.skillForm.value.tipo_empleo)})
    console.log('Form->', this.skillForm.value);
    console.log('entre nuevoSkill Skill');
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
    let a = confirm('¿Desea realmente eliminar este Experiencia?');
    if(a==true){
      this.portfolioService.eliminarSkill(id).subscribe(data => {
        this.resp = data
        console.log(this.resp);
        if(this.resp == 200){
          console.log('entre a if');
          this.reload();
          return data = data;
        } else {
          console.log('entre a else');
          this.resp='error';
          return data = this.resp;
        }
      })
    }
    
  }

}
