"use client";

import { useEffect, useRef, useState } from "react";
import * as Phaser from "phaser";

import PagFinalizar from "./pagFinalizar/pagFinal"

type CodeFillProps = {
  content: string;
  answers: string[];
  description: string;
};

export default function CodeFillGame({ content, answers, description }: CodeFillProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstance = useRef<Phaser.Game | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    setIsMobile(checkMobile());
  }, []);

  useEffect(() => {
    if (!gameRef.current) return;

    class CodeScene extends Phaser.Scene {
      inputs: Phaser.GameObjects.DOMElement[] = [];
      answers: string[];
      score: number = 0;
      total: number = 0;
      particlesEmitter: Phaser.GameObjects.Particles.ParticleEmitter | null = null;
      robot: Phaser.GameObjects.Image | null = null;
      scoreText: Phaser.GameObjects.Text | null = null;
      inputFocus: boolean = false;

      constructor() {
        super("CodeScene");
        this.answers = [...answers];
      }

      preload() {
        this.load.image("particle1", "/img/star.png");
        this.load.image("robot", "/img/personaje-guia.png");
      }

      create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        this.add.particles(0, 0, "particle1", {
          x: { min: 0, max: width },
          y: 0,
          lifespan: 6000,
          speedY: { min: 20, max: 60 },
          scale: { start: 0.3, end: 0 },
          alpha: { start: 0.8, end: 0 },
          quantity: 2,
          blendMode: "ADD",
        })

        const lines = content.split("\n");
        // Ajustar tamaño de fuente para móviles
        const baseFontSize = isMobile ? Math.max(10, Math.min(14, width / 60)) : Math.max(12, Math.min(16, width / 50));
        const baseStyle = { 
          fontSize: `${baseFontSize}px`,
          fontFamily: "'Fira Code', monospace",
          fill: "#e2e8f0",
          padding: { left: 5, right: 5 }
        };

        // POSICIÓN AJUSTADA DEL ROBOT - Más arriba en móviles
        const robotX = isMobile ? width * 0.1 : width * 0.12;
        const robotY = isMobile ? height * 0.8 : height * 0.8;
        this.robot = this.add.image(robotX, robotY, "robot")
          .setScale(isMobile ? 0.035 : 0.06)
          .setAlpha(0);

        this.tweens.add({
          targets: this.robot,
          x: isMobile ? width * 0.12 : width * 0.15,
          alpha: 1,
          duration: 1200,
          ease: "Back.out",
          delay: 300,
          onComplete: () => {
            this.tweens.add({
              targets: this.robot,
              y: this.robot!.y - 15,
              duration: 800,
              yoyo: true,
              repeat: -1,
              ease: "Sine.easeInOut"
            });
          }
        });

        // BURBUJA DE TEXTO CON POSICIÓN AJUSTADA - Más arriba en móviles
        const bubbleWidth = isMobile ? width * 0.8 : width * 0.4;
        const bubbleX = isMobile ? width * 0.1 : width * 0.2;
        const bubbleY = isMobile ? height * 0.8 : height * 0.75;
        
        const bubble = this.add.graphics();
        bubble.fillStyle(0x2d3748, 0.95);
        bubble.fillRoundedRect(bubbleX, bubbleY, bubbleWidth, isMobile ? 70 : 80, 16);
        bubble.lineStyle(2, 0x4f46e5, 1);
        bubble.strokeRoundedRect(bubbleX, bubbleY, bubbleWidth, isMobile ? 70 : 80, 16);

        // TEXTO DE LA BURBUJA CON POSICIÓN AJUSTADA
        const descFontSize = isMobile ? Math.max(10, Math.min(14, width / 65)) : Math.max(12, Math.min(16, width / 55));
        this.add.text(bubbleX + 15, bubbleY + 15, description, {
          font: `${descFontSize}px 'Inter', sans-serif`,
          color: "#e2e8f0",
          wordWrap: { width: bubbleWidth - 30 },
          align: "center"
        });

        // Texto de puntuación - Posición responsiva
        this.scoreText = this.add.text(width - 20, 20, `Puntuación: ${this.score}/${this.total}`, {
          font: `${descFontSize}px 'Inter', sans-serif`,
          color: "#e2e8f0",
          backgroundColor: "#4f46e5",
          padding: { x: 10, y: 5 }
        }).setOrigin(1, 0);

        // Ajustar espaciado para el código
        let y = isMobile ? 20 : 40; 
        const lineSpacing = isMobile ? 35 : 40; 
        const inputWidth = isMobile ? 70 : 90;
        const inputHeight = isMobile ? 36 : 32;
        
        lines.forEach((line) => {
          const parts = line.split("____");
          let x = 30;

          // Dividir líneas largas
          const maxLineWidth = width - 60; // Margen de 30px a cada lado
          
          parts.forEach((part, i) => {
            const textWidth = this.measureTextWidth(part, baseStyle.fontSize, baseStyle.fontFamily);
            
            // Si el texto es demasiado ancho, dividirlo en múltiples líneas
            if (x + textWidth > maxLineWidth) {
              x = 30;
              y += lineSpacing;
            }
            
            // Fondo para el texto de código
            const bg = this.add.graphics();
            bg.fillStyle(0x1e293b, 0.85);
            bg.fillRoundedRect(x - 6, y - 4, textWidth + 12, isMobile ? 26 : 28, 6);

            // Texto de código
            this.add.text(x, y, part, {
              ...baseStyle,
              color: "#f1f5f9",
              fontStyle: "bold",
              shadow: {
                offsetX: 1,
                offsetY: 1,
                color: "#1e1e1e",
                blur: 2,
                fill: true,
              },
            });
            x += textWidth + 10;

            if (i < parts.length - 1) {
              const inputFontSize = isMobile ? Math.max(10, Math.min(12, width / 70)) : Math.max(12, Math.min(14, width / 60));
              
              // Verificar si hay espacio para el input
              if (x + inputWidth > maxLineWidth) {
                x = 30;
                y += lineSpacing;
              }
              
              const input = this.add.dom(x, y + (isMobile ? 3 : 5)).createFromHTML(`
                <input 
                  name="input"
                  type="text" 
                  class="code-input"
                  style="
                    width: ${inputWidth}px;
                    height: ${inputHeight}px;
                    font-size: ${inputFontSize}px;
                    font-family: 'Fira Code', monospace;
                    padding: 5px 10px;
                    border-radius: 6px;
                    background: linear-gradient(to bottom, #1e293b, #0f172a);
                    color: #93c5fd;
                    border: 2px solid #4f46e5;
                    box-shadow: 0 0 10px rgba(79, 70, 229, 0.3);
                    outline: none;
                    text-align: center;
                    transition: all 0.3s ease;
                    margin-left: 10px;
                    min-height: 44px;
                  " 
                  placeholder="etiqueta"
                />
              `);
              
              // SOLUCIÓN PARA MÓVILES: Manejar correctamente los eventos táctiles
              const inputElement = input.node.querySelector('input') as HTMLInputElement;
              if (inputElement) {
                // Prevenir que Phaser capture los eventos
                inputElement.addEventListener('touchstart', (e) => {
                  e.stopPropagation();
                  this.inputFocus = true;
                }, { passive: false });
                
                inputElement.addEventListener('mousedown', (e) => {
                  e.stopPropagation();
                  this.inputFocus = true;
                });
                
                inputElement.addEventListener('focus', () => {
                  this.inputFocus = true;
                });
                
                inputElement.addEventListener('blur', () => {
                  this.inputFocus = false;
                });
              }
              
              this.inputs.push(input);
              this.total++;
              x += inputWidth + 15;
            }
          });

          y += lineSpacing;
        });

        this.scoreText?.setText(`Puntuación: ${this.score}/${this.total}`);
        const verifyButtonContainer = this.add.container(width / 2, y + 40);

        // BOTÓN CON ESTILOS RESPONSIVOS
        const buttonFontSize = isMobile ? Math.max(12, Math.min(14, width / 65)) : Math.max(14, Math.min(16, width / 55));
        const verifyButton = this.add.dom(0, 0).createFromHTML(`
          <button class="verify-button" style="
            padding: ${isMobile ? '0.5rem 1.2rem' : '0.6rem 1.5rem'};
            font-size: ${buttonFontSize}px;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            border: none;
            border-radius: 0.5rem;
            background: linear-gradient(to right, #4f46e5, #7c3aed);
            color: white;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            display: block;
            width: 100%;
            max-width: ${isMobile ? '180px' : '220px'};
            margin: 0 auto;
            min-height: 44px;
          ">
            Verificar
            <span style="
              position: absolute;
              background: rgba(255,255,255,0.2);
              transform: translateX(-100%) rotate(10deg);
              width: 20px;
              height: 100%;
              top: 0;
              left: 0;
              transition: transform 0.6s ease;
            "></span>
          </button>
        `);

        verifyButtonContainer.add(verifyButton);

        verifyButton.addListener("click");
        verifyButton.on("click", () => {
          this.validateInputs();
        });

        verifyButton.addListener("mousedown");
        verifyButton.on("mousedown", () => {
          verifyButton.setScale(0.95);
        });
        
        verifyButton.addListener("mouseup");
        verifyButton.on("mouseup", () => {
          verifyButton.setScale(1);
        });
        
        verifyButton.addListener("mouseover");
        verifyButton.on("mouseover", () => {
          verifyButton.setScale(1.05);
        });
        
        verifyButton.addListener("mouseout");
        verifyButton.on("mouseout", () => {
          verifyButton.setScale(1);
        });

        // Desactivar la captura de eventos táctiles de Phaser cuando un input tiene el foco
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
          if (this.inputFocus) {
            pointer.event.preventDefault();
          }
        });
      }

      measureTextWidth(text: string, fontSize: string, fontFamily: string) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.font = `${fontSize} ${fontFamily}`;
          return ctx.measureText(text).width;
        }
        return 0;
      }

      validateInputs() {
        let allCorrect = true;
        let correctCount = 0;
        
        this.inputs.forEach((inputEl, index) => {
          const input = inputEl.getChildByName("input") as HTMLInputElement;
          const userValue = input?.value.trim();
          const correct = this.answers[index];

          if (userValue === correct) {
            input.style.borderColor = "#10b981";
            input.style.boxShadow = "0 0 12px rgba(16, 185, 129, 0.5)";
            input.style.background = "linear-gradient(to bottom, #064e3b, #022c22)";
            correctCount++;
          } else {
            input.style.borderColor = "#ef4444";
            input.style.boxShadow = "0 0 12px rgba(239, 68, 68, 0.5)";
            input.style.background = "linear-gradient(to bottom, #7f1d1d, #450a0a)";
            this.shake(inputEl);
            allCorrect = false;
          }
        });

        this.score = correctCount;
        this.scoreText?.setText(`Puntuación: ${this.score}/${this.total}`);
        
        if (allCorrect) {
          this.handleSuccess();
        }
      }

      shake(domElement: Phaser.GameObjects.DOMElement) {
        this.tweens.add({
          targets: domElement,
          x: domElement.x! - 8,
          duration: 60,
          yoyo: true,
          repeat: 3,
          ease: "Sine.easeInOut",
          onComplete: () => {
            domElement.setX(domElement.x! + 8);
          },
        });
      }

      handleSuccess() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        if (this.particlesEmitter) {
          this.particlesEmitter.setConfig({
            quantity: 20,
            speedY: { min: 100, max: 300 },
            scale: { start: 0.6, end: 0 },
            rotate: { min: -360, max: 360 },
            frequency: 30,
            lifespan: 2000
          });
          
          this.time.delayedCall(2000, () => {
            this.particlesEmitter?.setConfig({
              quantity: 3,
              speedY: { min: 50, max: 120 },
              scale: { start: 0.4, end: 0 },
              frequency: 80,
              lifespan: 8000
            });
          });
        }
        
        if (this.robot) {
          this.tweens.add({
            targets: this.robot,
            scale: this.robot.scale * 1.3,
            duration: 500,
            yoyo: true,
            repeat: 1,
            ease: "Bounce.out"
          });
        }
        
        const successText = this.add.text(width / 2, height / 2, "¡Perfecto!", {
          font: "48px 'Inter', sans-serif",
          color: "#10b981",
          stroke: "#022c22",
          strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0);
        
        this.tweens.add({
          targets: successText,
          alpha: 1,
          scale: 1.2,
          duration: 800,
          ease: "Elastic.out",
          onComplete: () => {
            this.tweens.add({
              targets: successText,
              alpha: 0,
              y: successText.y - 100,
              duration: 1000,
              delay: 1000,
              ease: "Power2"
            });
          }
        });
        
        setScore(this.score);
        setTotal(this.total);
        setGameComplete(true);
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: gameRef.current.clientWidth,
      height: gameRef.current.clientHeight,
      backgroundColor: "#0f172a",
      parent: gameRef.current,
      scene: CodeScene,
      dom: {
        createContainer: true,
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      input: {
        touch: {
          capture: !isMobile
        }
      }
    };

    gameInstance.current = new Phaser.Game(config);

    const handleResize = () => {
      if (gameInstance.current && gameRef.current) {
        gameInstance.current.scale.resize(gameRef.current.clientWidth, gameRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (gameInstance.current) {
        gameInstance.current.destroy(true);
        gameInstance.current = null;
      }
    };
  }, [content, answers, description, isMobile]);

  if(gameComplete){
    return <PagFinalizar score={score} total={total} />
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div ref={gameRef} className="w-full h-[70vh] min-h-[500px] max-h-[800px] max-w-6xl rounded-xl overflow-hidden shadow-2xl" />
    </div>
  );
}