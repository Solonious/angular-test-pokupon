import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  serachSystems = [
    {name: 'google', host: 'www.google.com'},
    {name: 'bink', host: 'www.bink.com'},
    {name: 'ask', host: 'ask.fm'}
  ];

  searchForm: FormGroup;
  searchField: FormControl;
  searchEngine: FormControl;
  searchEngineValue: string;
  searchValue: string;

  constructor(
    private fb: FormBuilder
  ) {
    this.searchField = new FormControl('', [Validators.required, Validators.minLength(1)]);
    this.searchEngine = new FormControl('', [Validators.required]);
    this.searchForm = fb.group({
      search: this.searchField,
      engine: this.searchEngine
    });

    this.searchEngine.valueChanges.subscribe(val => this.searchEngineValue = val);

    this.searchField.valueChanges.subscribe(val => this.searchValue = val);

  }
  ngOnInit() {}
  navigateTo() {
    this.searchValue = encodeURIComponent(this.searchValue);
    window.location.href = `https://${this.searchEngineValue}/search?q=${this.searchValue}`;
  }
}
