export namespace Utils {
    export const DefaultDemoEvents = new DemoEvents().name;
    export function emitEvent(appManager: AppManager, element: any, eventName: string, data = {}) {
        const event = new DemoEvents();
        event.name += eventName;
        appManager.eventManager.next({
            origin: element,
            eventType: event,
            message: data,
        });
    }
    export function getCustomAttribute(element, str) {
        return window.localQuestionnaireConfig?.[str] || element?.getCustomAttribute(str);
    }

    export function PreventSDK() {
        const nosdk = GetQueryFromUrl('nosdk');
        return !!nosdk;
    }

    function GetQueryFromUrl(name: string, uri?: string) {
        if (!uri) {
            uri = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(uri);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    export function string2HtmlElement(str: string) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = str;
        return wrapper.firstChild as HTMLElement;
    }

    export function TextureAsPromise(imageOptions: Image.ImageOptions) {
        return () => {
            return new window.ImageUtils.Image(this.appManager, imageOptions).Load();
        };
    }

    export function RemoveChildrenFromElement(element: HTMLElement) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    export async function SleepMS(ms: number) {
        return new Promise<void>((resolve, reject) => {
            window.setTimeout(() => {
                resolve();
            }, ms);
        });
    }

    export async function injectJsFile(src: string, type: 'text/javascript' | 'application/javascript' = 'text/javascript') {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.async = true;
            script.crossOrigin = 'anonymous';
            script.type = type;
            script.onload = () => {
                resolve(script);
            };
            script.onerror = err => {
                reject(err);
            };
            script.src = src;
            document.head.appendChild(script);
        });
    }
}


// Usage

/**
 * 
 * import {Utils} from ./typescript.ts
 * 
 * 
 * 
 * Utils.injectJsFile('https://example.js','application/javascript');
 */
