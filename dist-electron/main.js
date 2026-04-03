import { BrowserWindow, app, ipcMain } from "electron";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
//#region electron/main.ts
var __dirname = fileURLToPath(new URL(".", "" + import.meta.url));
process.env.APP_ROOT = join(__dirname, "..");
var VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
var MAIN_DIST = join(process.env.APP_ROOT, "dist-electron");
var RENDERER_DIST = join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? join(process.env.APP_ROOT, "public") : RENDERER_DIST;
var win = null;
function createWindow() {
	win = new BrowserWindow({
		width: 1e3,
		height: 700,
		titleBarStyle: "hiddenInset",
		icon: join(process.env.VITE_PUBLIC || "", "logo.png"),
		transparent: true,
		vibrancy: "menu",
		visualEffectState: "active",
		hasShadow: true,
		webPreferences: {
			preload: join(__dirname, "preload.mjs"),
			contextIsolation: true,
			nodeIntegration: false
		}
	});
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
	});
	if (VITE_DEV_SERVER_URL) win.loadURL(VITE_DEV_SERVER_URL);
	else win.loadFile(join(RENDERER_DIST, "index.html"));
}
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		win = null;
	}
});
app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
app.whenReady().then(() => {
	ipcMain.handle("window-minimize", () => {
		win?.minimize();
	});
	ipcMain.handle("window-maximize", () => {
		if (win?.isMaximized()) win.unmaximize();
		else win?.maximize();
	});
	ipcMain.handle("window-close", () => {
		win?.close();
	});
	createWindow();
});
//#endregion
export { MAIN_DIST, RENDERER_DIST, VITE_DEV_SERVER_URL };
