// chatbot.component.ts
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface Message {
  text: string;
  isBot: boolean;
  isTyping?: boolean;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0, transform: 'translateY(10px)' })),
      transition(':enter', [
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ChatbotComponent implements OnInit {
  messages: Message[] = [];
  currentQuestion: string = '';
  isLoading: boolean = false;
  currentTypingIndex: number = 0;
  typingSpeed: number = 50;

  predefinedQuestions = [
    "What services do you offer?",
    "How can I contact customer support?",
    "What are your business hours?",
    "Do you offer international shipping?",
    "What payment methods do you accept?"
  ];

  predefinedAnswers = [
    "We offer a wide range of digital services including web development, mobile app development, and cloud solutions.",
    "You can reach our customer support team 24/7 via email at support@example.com or call us at 1-800-123-4567.",
    "Our business hours are Monday to Friday, 9 AM to 6 PM EST.",
    "Yes, we offer international shipping to over 100 countries worldwide.",
    "We accept all major credit cards, PayPal, and bank transfers."
  ];

  ngOnInit() {
    this.addMessage("Hi! I'm your virtual assistant. How can I help you today?", true);
  }

  async addMessage(text: string, isBot: boolean) {
    if (isBot) {
      const message: Message = { text: '', isBot, isTyping: true };
      this.messages.push(message);
      
      // Typewriter effect
      for (let i = 0; i <= text.length; i++) {
        message.text = text.slice(0, i);
        await new Promise(resolve => setTimeout(resolve, this.typingSpeed));
      }
      message.isTyping = false;
    } else {
      this.messages.push({ text, isBot });
    }
  }

  async handleQuestionClick(index: number) {
    const question = this.predefinedQuestions[index];
    const answer = this.predefinedAnswers[index];
    
    this.addMessage(question, false);
    this.isLoading = true;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.isLoading = false;
    
    this.addMessage(answer, true);
  }
}