#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
#![allow(dead_code, unused_imports)]


use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;
use tauri::State;
use arboard::Clipboard;
use chrono::{DateTime, Local};
use sysinfo::System;
use serde::Serialize;

#[derive(Serialize, Clone)]
struct ClipboardItem {
    content: String,
    timestamp: String,
    app: String,
}

type SharedHistory = Arc<Mutex<Vec<ClipboardItem>>>;

#[tauri::command]
fn get_clipboard_history(history: State<SharedHistory>) -> Vec<ClipboardItem> {
    history.lock().unwrap().clone()
}

fn get_frontmost_app() -> String {
    let mut sys = System::new_all();
    sys.refresh_all();
    let mut app_name = String::from("");
    for process in sys.processes().values() {
        if process.cpu_usage() > 0.0 {
            app_name = process.name().to_string_lossy().to_string();
        }
    }
    app_name
}

fn main() {
    let history: SharedHistory = Arc::new(Mutex::new(Vec::new()));
    let history_clone = Arc::clone(&history);
    thread::spawn(move || {
        let mut clipboard = Clipboard::new().unwrap();
        let mut last_content = String::new();
        loop {
            if let Ok(content) = clipboard.get_text() {
                if content != last_content {
                    last_content = content.clone();
                    let timestamp: DateTime<Local> = Local::now();
                    let app = get_frontmost_app();
                    let item = ClipboardItem {
                        content,
                        timestamp: timestamp.format("%Y-%m-%d %H:%M:%S").to_string(),
                        app,
                    };
                    let mut hist = history_clone.lock().unwrap();
                    hist.insert(0, item);
                    if hist.len() > 50 {
                        hist.truncate(50);
                    }
                }
            }
            thread::sleep(Duration::from_secs(1));
        }
    });
    tauri::Builder::default()
        .manage(history)
        .invoke_handler(tauri::generate_handler![get_clipboard_history])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
