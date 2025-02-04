package main

import (
	"net/http"
	"path/filepath"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/pdfcpu/pdfcpu/pkg/api"
	"github.com/pdfcpu/pdfcpu/pkg/pdfcpu"
	"github.com/pdfcpu/pdfcpu/pkg/pdfcpu/types"
)

type Input struct {
	X        float64 `json:"x"`
	Y        float64 `json:"y"`
	Text     string  `json:"text"`
	FontSize int     `json:"fontSize"`
}

type Stamp struct {
	X          float64 `json:"x"`
	Y          float64 `json:"y"`
	StampIndex int64   `json:"stampIndex"`
}

type StampRequest struct {
	Inputs []Input `json:"inputs"`
	Stamps []Stamp `json:"stamps"`
}

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.GET("/image", func(c echo.Context) error {
		return c.File("../../assets/png/invoice.png")
	})

	e.GET("/created", func(c echo.Context) error {
		return c.File("../../assets/save/invoice.pdf")
	})

	e.GET("/stamp/:stampIndex", func(c echo.Context) error {
		stampIndex := c.Param("stampIndex")
		return c.File("../../assets/stamp/stamp" + stampIndex + ".png")
	})

	e.POST("/edit", func(c echo.Context) error {
		// リクエストボディの JSON データを取得
		req := new(StampRequest)
		if err := c.Bind(req); err != nil {
			return err
		}

		// assetsフォルダからPDFファイルを読み込む
		inFile := filepath.Join("..", "..", "assets", "pdf", "invoice.pdf")
		ctx, err := api.ReadContextFile(inFile)
		if err != nil {
			return err
		}

		inputs := req.Inputs

		for _, input := range inputs {

			text := input.Text
			xStr := strconv.FormatFloat(input.X, 'f', -1, 64)
			yStr := strconv.FormatFloat(input.Y-float64(input.FontSize/2), 'f', -1, 64)
			fontSizeStr := strconv.Itoa(input.FontSize)
			unit := types.POINTS

			wm, err := api.TextWatermark(text, "fo:Roboto-Regular, points:"+fontSizeStr+", scale:1 abs, color:.0 .0 .0, pos:tl, off:"+xStr+" "+yStr+", rot:0", true, false, unit)
			if err != nil {
				return err
			}

			// Watermark を追加
			err = pdfcpu.AddWatermarks(ctx, nil, wm)
			if err != nil {
				return err
			}
		}

		stamps := req.Stamps

		for _, stamp := range stamps {
			xStr := strconv.FormatFloat(stamp.X, 'f', -1, 64)
			yStr := strconv.FormatFloat(stamp.Y, 'f', -1, 64)
			fileName := "../../assets/stamp/stamp" + strconv.FormatInt(stamp.StampIndex, 10) + ".png"
			unit := types.POINTS

			wm, err := api.ImageWatermark(fileName, "scale:0.5 abs, pos:tl, off:"+xStr+" "+yStr+", rot:0", true, false, unit)

			if err != nil {
				return err
			}

			// Watermark を追加
			err = pdfcpu.AddWatermarks(ctx, nil, wm)
			if err != nil {
				return err
			}
		}

		// 新しいPDFをsaveフォルダに保存
		outFile := filepath.Join("..", "..", "assets", "save", "invoice.pdf")
		// バッファの内容をファイルに書き込む
		err = api.WriteContextFile(ctx, outFile)
		if err != nil {
			return err
		}

		return c.JSON(http.StatusOK, map[string]string{"message": "success"})
	})
	e.Logger.Fatal(e.Start(":8080"))
}
