"use client";

import { useEffect, useRef } from "react";
import * as Phaser from "phaser";

type CodeFillProps = {
  content: string;
  answers: string[];
};

export default function CodeFillGame({ content, answers }: CodeFillProps) {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    class CodeScene extends Phaser.Scene {
      inputs: Phaser.GameObjects.DOMElement[] = [];
      answers: string[];

      constructor() {
        super("CodeScene");
        this.answers = [...answers];
      }

      preload() {
        this.load.image("particle", "/img/star.png");
        this.load.image("robot", "/img/personaje-guia.png");
      }

      create() {

        const particles = this.add.particles(0, 0, "particle", {
          x: { min: 0, max: 800 },
          y: 0,
          lifespan: 6000,
          speedY: { min: 20, max: 60 },
          scale: { start: 0.3, end: 0 },
          alpha: { start: 0.4, end: 0 },
          quantity: 2,
          blendMode: "ADD",
        });

        const lines = content.split("\n");
        const style = { font: "16px monospace", fill: "#fff" };

        // Posición inicial fuera de pantalla
        const robot = this.add.image(-100, 480, "robot")
          .setScale(0.07)
          .setAlpha(0);

        this.tweens.add({
          targets: robot,
          x: 100,        
          alpha: 1,
          duration: 1000,
          ease: "Power2",
          onComplete: () => {
            this.tweens.add({
              targets: robot,
              y: robot.y - 10,
              yoyo: true,
              repeat: 2,
              duration: 150,
              ease: "Sine.easeInOut"
            });
          }
        });


        // Burbuja de texto con instrucciones
        const bubble = this.add.graphics();
        bubble.fillStyle(0xffffff, 0.9);
        bubble.fillRoundedRect(160, 450, 300, 80, 16);

        const text = this.add.text(180, 470, "¡Completa los espacios con las etiquetas correctas!", {
          font: "16px Arial",
          color: "#333",
          wordWrap: { width: 280 }
        });

        let y = 20;
        lines.forEach((line) => {
          const parts = line.split("____");
          let x = 20;

          parts.forEach((part, i) => {
            // Texto fijo
            this.add.text(x, y, part, style);
            x += this.measureTextWidth(part, style.font);

            // Espacio editable si hay espacio en blanco
            if (i < parts.length - 1) {
              const input = this.add.dom(x + 50, y + 5).createFromHTML(`
                <input 
                  name="input"
                  type="text" 
                  style="
                    width: 90px;
                    font-size: 14px;
                    padding: 3px 8px;
                    border-radius: 4px;
                    background-color: #1e1e1e;
                    color: #9cdcfe;
                    border: 1px solid #3c3c3c;
                    box-shadow: 0 0 6px rgba(97, 218, 251, 0.15);
                    outline: none;
                    text-align: center;
                    transition: box-shadow 0.3s;
                  " 
                  onfocus="this.style.boxShadow='0 0 10px rgba(97, 218, 251, 0.5)'"
                  onblur="this.style.boxShadow='0 0 6px rgba(97, 218, 251, 0.15)'"
                  placeholder="tag"
                />
              `);
              this.inputs.push(input);
              x += 120;
            }
          });

          y += 30;
        });

        // Botón Verificar
          const verifyButton = this.add.dom(400, y + 40).createFromHTML(`
            <button style="
              padding: 10px 20px;
              font-size: 16px;
              border: none;
              border-radius: 8px;
              background: linear-gradient(to right, #4f46e5, #9333ea);
              color: white;
              cursor: pointer;
              box-shadow: 0 4px 8px rgba(0,0,0,0.3);
              transition: transform 0.2s ease;
            ">
              Verificar
            </button>
          `);

          verifyButton.addListener("click");
          verifyButton.on("click", () => {
            this.validateInputs();
          });
      }

      measureTextWidth(text: string, font: string) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.font = font;
          return ctx.measureText(text).width;
        }
        return 0;
      }

      validateInputs() {
        this.inputs.forEach((inputEl, index) => {
          const input = inputEl.getChildByName("input") as HTMLInputElement;
          const userValue = input?.value.trim();
          const correct = this.answers[index];

          if (userValue === correct) {
            input.style.borderColor = "#4caf50"; // verde
            input.style.boxShadow = "0 0 8px rgba(76, 175, 80, 0.8)";
          } else {
            input.style.borderColor = "#f44336"; // rojo
            input.style.boxShadow = "0 0 8px rgba(244, 67, 54, 0.8)";
            this.shake(inputEl);
          }
        });
      }

      shake(domElement: Phaser.GameObjects.DOMElement) {
        this.tweens.add({
          targets: domElement,
          x: domElement.x! - 10,
          duration: 50,
          yoyo: true,
          repeat: 3,
          onComplete: () => {
            domElement.setX(domElement.x! + 10); // restaurar
          },
        });
      }

      
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#1e1e1e",
      parent: gameRef.current || undefined,
      scene: CodeScene,
      dom: {
        createContainer: true,
      },
    };

    const game = new Phaser.Game(config);
    return () => game.destroy(true);
  }, [content]);

  return <div ref={gameRef} className="w-full h-[600px] flex justify-center items-center" />;
}
