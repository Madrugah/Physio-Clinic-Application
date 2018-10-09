import { Component, OnInit, Input } from '@angular/core';
import { PhysicianManageProfileService } from '../../../services/physician-manage-profile.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() notes: any;
  @Input() isAdmin;
  @Input() email;
  @Input() token;
  @Input() isPhys;
  poster;

  constructor( private physicianTools: PhysicianManageProfileService) { }

  ngOnInit() {  
  }
  onSubmitNote(form: NgForm){
    const frm = form.value;
    
    var note = frm.note;
    // grabs profile 
    this.physicianTools.retrieveProfile1(this.token).then((respons)=>{
        const posterMail = JSON.parse(respons._body).data;
        this.poster = posterMail.email;
        
        note = note.concat(" - ");
        note = note.concat(this.poster);
        note = note.concat(" at: ");
        var dat = new Date(Date.now());
        var str = "";
        str = str.concat(dat.toISOString().split('.')[0]);
        str = str.concat("+00:00");
        var newDate = new Date(str);
        note = note.concat(newDate); 
        //concat date to note and post to the patient profile
         this.physicianTools.postNote(note,this.email).then( (removeResp) => { 
          this.physicianTools.retrieveProfile(this.email).then( (resp) =>{
           const parseddProfile = JSON.parse(resp._body).data; 
           this.notes = parseddProfile.notes;
         });
       }); 
    });
  }
  // removes the selected note form the users notes
  removeNote(n){ 
    this.physicianTools.removeNote(n,this.email).then((resp) => { 
      this.physicianTools.retrieveProfile(this.email).then( (resp) =>{
           const parseddProfile = JSON.parse(resp._body).data; 
           this.notes = parseddProfile.notes;
         });
    });
  }
}
