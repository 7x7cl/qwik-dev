const QWIK_LOADER = "((e,t)=>{const n=\"__q_context__\",o=window,s=new Set,i=t=>e.querySelectorAll(t),a=(e,t,n=t.type)=>{i(\"[on\"+e+\"\\\\:\"+n+\"]\").forEach((o=>f(o,e,t,n)))},r=(e,t)=>e.getAttribute(t),l=t=>{if(void 0===t._qwikjson_){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if(\"SCRIPT\"===n.tagName&&\"qwik/json\"===r(n,\"type\")){t._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/g,\"<$1\"));break}n=n.previousElementSibling}}},c=(e,t)=>new CustomEvent(e,{detail:t}),f=async(t,o,s,i=s.type)=>{const a=\"on\"+o+\":\"+i;t.hasAttribute(\"preventdefault:\"+i)&&s.preventDefault();const c=t._qc_,f=null==c?void 0:c.li.filter((e=>e[0]===a));if(f&&f.length>0){for(const e of f)await e[1].getFn([t,s],(()=>t.isConnected))(s,t);return}const b=r(t,a);if(b){const o=t.closest(\"[q\\\\:container]\"),i=new URL(r(o,\"q:base\"),e.baseURI);for(const a of b.split(\"\\n\")){const r=new URL(a,i),c=r.hash.replace(/^#?([^?[|]*).*$/,\"$1\")||\"default\",f=performance.now(),b=import(r.href.split(\"#\")[0]);l(o);const p=(await b)[c],u=e[n];if(t.isConnected)try{e[n]=[t,s,r],d(\"qsymbol\",{symbol:c,element:t,reqTime:f}),await p(s,t)}finally{e[n]=u}}}},d=(t,n)=>{e.dispatchEvent(c(t,n))},b=e=>e.replace(/([A-Z])/g,(e=>\"-\"+e.toLowerCase())),p=async e=>{let t=b(e.type),n=e.target;for(a(\"-document\",e,t);n&&n.getAttribute;)await f(n,\"\",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},u=e=>{a(\"-window\",e,b(e.type))},w=()=>{var n;const a=e.readyState;if(!t&&(\"interactive\"==a||\"complete\"==a)&&(t=1,d(\"qinit\"),(null!=(n=o.requestIdleCallback)?n:o.setTimeout).bind(o)((()=>d(\"qidle\"))),s.has(\"qvisible\"))){const e=i(\"[on\\\\:qvisible]\"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),f(n.target,\"\",c(\"qvisible\",n)))}));e.forEach((e=>t.observe(e)))}},q=(e,t,n,o=!1)=>e.addEventListener(t,n,{capture:o,passive:!1}),v=t=>{for(const n of t)s.has(n)||(q(e,n,p,!0),q(o,n,u),s.add(n))};if(!e.qR){const t=o.qwikevents;Array.isArray(t)&&v(t),o.qwikevents={push:(...e)=>v(e)},q(e,\"readystatechange\",w),w()}})(document);";
const QWIK_LOADER_DEBUG = "(() => {\n    ((doc, hasInitialized) => {\n        const win = window;\n        const events =  new Set;\n        const querySelectorAll = query => doc.querySelectorAll(query);\n        const broadcast = (infix, ev, type = ev.type) => {\n            querySelectorAll(\"[on\" + infix + \"\\\\:\" + type + \"]\").forEach((target => dispatch(target, infix, ev, type)));\n        };\n        const getAttribute = (el, name) => el.getAttribute(name);\n        const resolveContainer = containerEl => {\n            if (void 0 === containerEl._qwikjson_) {\n                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;\n                while (script) {\n                    if (\"SCRIPT\" === script.tagName && \"qwik/json\" === getAttribute(script, \"type\")) {\n                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/g, \"<$1\"));\n                        break;\n                    }\n                    script = script.previousElementSibling;\n                }\n            }\n        };\n        const createEvent = (eventName, detail) => new CustomEvent(eventName, {\n            detail: detail\n        });\n        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {\n            const attrName = \"on\" + onPrefix + \":\" + eventName;\n            element.hasAttribute(\"preventdefault:\" + eventName) && ev.preventDefault();\n            const ctx = element._qc_;\n            const qrls = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));\n            if (qrls && qrls.length > 0) {\n                for (const q of qrls) {\n                    await q[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);\n                }\n                return;\n            }\n            const attrValue = getAttribute(element, attrName);\n            if (attrValue) {\n                const container = element.closest(\"[q\\\\:container]\");\n                const base = new URL(getAttribute(container, \"q:base\"), doc.baseURI);\n                for (const qrl of attrValue.split(\"\\n\")) {\n                    const url = new URL(qrl, base);\n                    const symbolName = url.hash.replace(/^#?([^?[|]*).*$/, \"$1\") || \"default\";\n                    const reqTime = performance.now();\n                    const module = import(url.href.split(\"#\")[0]);\n                    resolveContainer(container);\n                    const handler = (await module)[symbolName];\n                    const previousCtx = doc.__q_context__;\n                    if (element.isConnected) {\n                        try {\n                            doc.__q_context__ = [ element, ev, url ];\n                            emitEvent(\"qsymbol\", {\n                                symbol: symbolName,\n                                element: element,\n                                reqTime: reqTime\n                            });\n                            await handler(ev, element);\n                        } finally {\n                            doc.__q_context__ = previousCtx;\n                        }\n                    }\n                }\n            }\n        };\n        const emitEvent = (eventName, detail) => {\n            doc.dispatchEvent(createEvent(eventName, detail));\n        };\n        const camelToKebab = str => str.replace(/([A-Z])/g, (a => \"-\" + a.toLowerCase()));\n        const processDocumentEvent = async ev => {\n            let type = camelToKebab(ev.type);\n            let element = ev.target;\n            broadcast(\"-document\", ev, type);\n            while (element && element.getAttribute) {\n                await dispatch(element, \"\", ev, type);\n                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;\n            }\n        };\n        const processWindowEvent = ev => {\n            broadcast(\"-window\", ev, camelToKebab(ev.type));\n        };\n        const processReadyStateChange = () => {\n            var _a;\n            const readyState = doc.readyState;\n            if (!hasInitialized && (\"interactive\" == readyState || \"complete\" == readyState)) {\n                hasInitialized = 1;\n                emitEvent(\"qinit\");\n                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent(\"qidle\")));\n                if (events.has(\"qvisible\")) {\n                    const results = querySelectorAll(\"[on\\\\:qvisible]\");\n                    const observer = new IntersectionObserver((entries => {\n                        for (const entry of entries) {\n                            if (entry.isIntersecting) {\n                                observer.unobserve(entry.target);\n                                dispatch(entry.target, \"\", createEvent(\"qvisible\", entry));\n                            }\n                        }\n                    }));\n                    results.forEach((el => observer.observe(el)));\n                }\n            }\n        };\n        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {\n            capture: capture,\n            passive: !1\n        });\n        const push = eventNames => {\n            for (const eventName of eventNames) {\n                if (!events.has(eventName)) {\n                    addEventListener(doc, eventName, processDocumentEvent, !0);\n                    addEventListener(win, eventName, processWindowEvent);\n                    events.add(eventName);\n                }\n            }\n        };\n        if (!doc.qR) {\n            const qwikevents = win.qwikevents;\n            Array.isArray(qwikevents) && push(qwikevents);\n            win.qwikevents = {\n                push: (...e) => push(e)\n            };\n            addEventListener(doc, \"readystatechange\", processReadyStateChange);\n            processReadyStateChange();\n        }\n    })(document);\n})();";
export { QWIK_LOADER, QWIK_LOADER_DEBUG };