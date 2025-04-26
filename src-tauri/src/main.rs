#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[allow(dead_code)]
use tauri::menu::MenuBuilder;
#[tauri::command]
fn create_menu_app () {
    tauri::Builder::default()
        .setup(|app| {
            let menu = MenuBuilder::new(app)
                .text("open" , "Open")
                .text("close" , "Close").build()?;

            app.set_menu(menu)?;
            Ok(())
        })

}

fn main() {
   create_menu_app();
}