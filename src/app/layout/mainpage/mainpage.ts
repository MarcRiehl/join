import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Navbar } from "../navbar/navbar";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-mainpage',
  imports: [Header, Navbar, RouterOutlet],
  templateUrl: './mainpage.html',
  styleUrl: './mainpage.scss',
})
export class MainPage {}
