import type { Plugin } from "@opencode-ai/plugin";
import { spawn } from "child_process";

export const NotificationPlugin: Plugin = async () => {
	return {
		async event(input) {
			if (input.event.type === "session.idle") {
				const homeDir = process.env.HOME;
				if (!homeDir) {
					return;
				}
				const soundFilePath = `${homeDir}/.config/opencode/assets/notification.mp3`;

				spawn("ffplay", ["-v", "0", "-nodisp", "-autoexit", soundFilePath], {
					detached: true,
					stdio: "ignore",
				}).unref();
			}
		},
	};
};
